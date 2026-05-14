// lib/server/mongodb.js

import { MongoClient } from 'mongodb';
import { getServerEnv, warnMissingEnv } from './env';

let warnedMissingUri = false;
let warnedConnectionUnavailable = false;

const uri = getServerEnv('MONGODB_URI');
const options = {};

let client;
let clientPromise;

if (!uri && !warnedMissingUri) {
  warnedMissingUri = true;
  warnMissingEnv('MONGODB_URI', '[MongoDB] MONGODB_URI is missing. Using fallback portfolio data.');
}

function onConnectionError(err) {
  if (!warnedConnectionUnavailable) {
    warnedConnectionUnavailable = true;
    console.warn('[MongoDB] Connection unavailable. Using fallback portfolio data.');
  }
  if (process.env.NODE_ENV === 'development' && err?.message) {
    console.warn(`[MongoDB] ${err.message}`);
  }
  return null;
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    if (!uri) {
      global._mongoClientPromise = Promise.resolve(null);
    } else {
      try {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect().catch(onConnectionError);
      } catch (err) {
        global._mongoClientPromise = Promise.resolve(onConnectionError(err));
      }
    }
  }
  clientPromise = global._mongoClientPromise;
} else {
  if (!uri) {
    clientPromise = Promise.resolve(null);
  } else {
    try {
      client = new MongoClient(uri, options);
      clientPromise = client.connect().catch(onConnectionError);
    } catch (err) {
      clientPromise = Promise.resolve(onConnectionError(err));
    }
  }
}

export default clientPromise;
