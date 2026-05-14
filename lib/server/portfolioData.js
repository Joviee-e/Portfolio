import { ObjectId } from 'mongodb';
import { COLLECTIONS, getCollection } from './db';
import { fallbackPortfolioData } from './fallbackData';

function normalizeRepoPrefs(items = []) {
  return items
    .filter((x) => x && x.name)
    .map((x, index) => ({
      name: x.name,
      preferred: !!x.preferred,
      hidden: !!x.hidden,
      order: Number.isFinite(x.order) ? x.order : index,
    }));
}

async function safeFindOne(collection, query) {
  if (!collection) return null;
  try {
    return await collection.findOne(query);
  } catch {
    return null;
  }
}

async function fetchGithubRepos(username) {
  if (!username) return [];
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function applyRepoPreferences(githubRepos, repoPrefs) {
  const prefMap = new Map(repoPrefs.map((r) => [r.name, r]));
  return githubRepos
    .map((repo) => {
      const pref = prefMap.get(repo.name);
      return {
        ...repo,
        preferred: pref ? pref.preferred : false,
        hidden: pref ? pref.hidden : false,
        order: pref ? pref.order : 999,
      };
    })
    .filter((repo) => !repo.hidden)
    .sort((a, b) => {
      if (a.preferred !== b.preferred) return a.preferred ? -1 : 1;
      if (a.order !== b.order) return a.order - b.order;
      return new Date(b.updated_at) - new Date(a.updated_at);
    })
    .slice(0, 8);
}

export async function getPublicPortfolioData() {
  const fallback = structuredClone(fallbackPortfolioData);

  try {
    const [settingsCol, statusCol, socialsCol, reposCol] = await Promise.all([
      getCollection(COLLECTIONS.portfolioSettings),
      getCollection(COLLECTIONS.currentStatus),
      getCollection(COLLECTIONS.socialLinks),
      getCollection(COLLECTIONS.featuredRepositories),
    ]);

    if (!settingsCol || !statusCol || !socialsCol || !reposCol) {
      const githubRepos = await fetchGithubRepos(fallback.settings.githubUsername);
      return {
        ...fallback,
        featuredRepositories: applyRepoPreferences(githubRepos, []),
      };
    }

    const [settingsDoc, statusDoc, socialsDoc, repoPrefDoc] = await Promise.all([
      safeFindOne(settingsCol, { key: 'main' }),
      safeFindOne(statusCol, { key: 'main' }),
      safeFindOne(socialsCol, { key: 'main' }),
      safeFindOne(reposCol, { key: 'main' }),
    ]);

    const settings = { ...fallback.settings, ...(settingsDoc?.data || {}) };
    const currentStatus = { ...fallback.currentStatus, ...(statusDoc?.data || {}) };
    const socialLinks = { ...fallback.socialLinks, ...(socialsDoc?.data || {}) };
    const repoPrefs = normalizeRepoPrefs(repoPrefDoc?.data?.repos || []);

    const githubRepos = await fetchGithubRepos(settings.githubUsername);
    const featuredRepositories = applyRepoPreferences(githubRepos, repoPrefs);

    return {
      settings,
      currentStatus,
      socialLinks,
      featuredRepositories,
      updatedAt: settingsDoc?.updatedAt || null,
    };
  } catch {
    const githubRepos = await fetchGithubRepos(fallback.settings.githubUsername);
    return {
      ...fallback,
      featuredRepositories: applyRepoPreferences(githubRepos, []),
    };
  }
}

export async function upsertDoc(collectionName, data) {
  const col = await getCollection(collectionName);
  if (!col) return { ok: false, reason: 'DB_UNAVAILABLE' };
  try {
    await col.updateOne(
      { key: 'main' },
      { $set: { key: 'main', data, updatedAt: new Date() } },
      { upsert: true }
    );
    return { ok: true };
  } catch {
    return { ok: false, reason: 'DB_WRITE_FAILED' };
  }
}

export async function replaceResume({ filename, mimeType, fileBuffer }) {
  const resumeCol = await getCollection(COLLECTIONS.resume);
  if (!resumeCol) return { ok: false, reason: 'DB_UNAVAILABLE' };
  try {
    await resumeCol.deleteMany({ key: 'active' });
    await resumeCol.insertOne({
      key: 'active',
      filename,
      mimeType,
      data: fileBuffer,
      uploadedAt: new Date(),
    });
    return { ok: true };
  } catch {
    return { ok: false, reason: 'DB_WRITE_FAILED' };
  }
}

export async function getResume() {
  const resumeCol = await getCollection(COLLECTIONS.resume);
  if (!resumeCol) return null;
  return safeFindOne(resumeCol, { key: 'active' });
}

export async function getDashboardData() {
  const publicData = await getPublicPortfolioData();
  const resume = await getResume();
  const githubRepos = await fetchGithubRepos(publicData.settings.githubUsername);

  const reposCol = await getCollection(COLLECTIONS.featuredRepositories);
  const repoPrefDoc = await safeFindOne(reposCol, { key: 'main' });

  return {
    ...publicData,
    githubRepos,
    repoPreferences: normalizeRepoPrefs(repoPrefDoc?.data?.repos || []),
    resumeMeta: resume
      ? {
          id: String(resume._id || new ObjectId()),
          filename: resume.filename,
          uploadedAt: resume.uploadedAt,
        }
      : null,
  };
}
