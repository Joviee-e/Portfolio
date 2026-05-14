import clientPromise from './mongodb';

export const COLLECTIONS = {
  portfolioSettings: 'portfolioSettings',
  featuredRepositories: 'featuredRepositories',
  currentStatus: 'currentStatus',
  resume: 'resume',
  socialLinks: 'socialLinks',
};

function getDbNameFromUri() {
  try {
    const uri = process.env.MONGODB_URI || '';
    const dbPart = uri.split('/').pop()?.split('?')[0];
    return dbPart || 'portfolio';
  } catch {
    return 'portfolio';
  }
}

export async function getDb() {
  try {
    const client = await clientPromise;
    if (!client) return null;
    return client.db(getDbNameFromUri());
  } catch {
    return null;
  }
}

export async function getCollection(name) {
  try {
    const db = await getDb();
    if (!db) return null;
    return db.collection(name);
  } catch {
    return null;
  }
}
