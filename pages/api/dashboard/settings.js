import { COLLECTIONS } from '../../../lib/server/db';
import { getDashboardData, upsertDoc } from '../../../lib/server/portfolioData';

function validateSettings(settings) {
  if (!settings || typeof settings !== 'object') return false;
  // Validate required string fields
  if (settings.heroSubtitle && typeof settings.heroSubtitle !== 'string') return false;
  if (settings.aboutSnippet && typeof settings.aboutSnippet !== 'string') return false;
  if (settings.currentFocus && typeof settings.currentFocus !== 'string') return false;
  if (settings.githubUsername && typeof settings.githubUsername !== 'string') return false;
  return true;
}

function validateStatus(status) {
  if (!status || typeof status !== 'object') return false;
  if (status.availability && typeof status.availability !== 'string') return false;
  if (status.customStatus && typeof status.customStatus !== 'string') return false;
  return true;
}

function validateSocialLinks(links) {
  if (!links || typeof links !== 'object') return false;
  for (const key in links) {
    if (key === 'custom' && Array.isArray(links[key])) continue;
    if (links[key] && typeof links[key] !== 'string') return false;
  }
  return true;
}

function validateRepoPreferences(prefs) {
  if (!Array.isArray(prefs)) return false;
  for (const pref of prefs) {
    if (typeof pref.name !== 'string') return false;
    if (typeof pref.preferred !== 'boolean' && typeof pref.preferred !== 'undefined') return false;
    if (typeof pref.hidden !== 'boolean' && typeof pref.hidden !== 'undefined') return false;
    if (typeof pref.order !== 'number' && typeof pref.order !== 'undefined') return false;
  }
  return true;
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = await getDashboardData();
      return res.status(200).json(data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      return res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
  }

  if (req.method === 'POST') {
    const { settings, currentStatus, socialLinks, repoPreferences } = req.body || {};

    // Validate input
    if (settings && !validateSettings(settings)) {
      return res.status(400).json({ error: 'Invalid settings format' });
    }
    if (currentStatus && !validateStatus(currentStatus)) {
      return res.status(400).json({ error: 'Invalid status format' });
    }
    if (socialLinks && !validateSocialLinks(socialLinks)) {
      return res.status(400).json({ error: 'Invalid social links format' });
    }
    if (repoPreferences && !validateRepoPreferences(repoPreferences)) {
      return res.status(400).json({ error: 'Invalid repository preferences format' });
    }

    try {
      if (settings) await upsertDoc(COLLECTIONS.portfolioSettings, settings);
      if (currentStatus) await upsertDoc(COLLECTIONS.currentStatus, currentStatus);
      if (socialLinks) await upsertDoc(COLLECTIONS.socialLinks, socialLinks);
      if (repoPreferences) await upsertDoc(COLLECTIONS.featuredRepositories, { repos: repoPreferences });

      const data = await getDashboardData();
      return res.status(200).json({ ok: true, data });
    } catch (err) {
      console.error('Error saving dashboard data:', err);
      return res.status(503).json({ error: 'Database unavailable. Public portfolio is still online with fallback data.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
