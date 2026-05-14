/**
 * Serialize MongoDB documents to JSON-safe objects
 * Converts:
 * - Date objects to ISO strings
 * - ObjectIds to strings
 * - Nested objects and arrays recursively
 */
export function serializeDocument(data) {
  if (data === null || data === undefined) {
    return data;
  }

  if (data instanceof Date) {
    return data.toISOString();
  }

  // MongoDB ObjectId
  if (typeof data === 'object' && typeof data.toString === 'function' && data.constructor?.name === 'ObjectId') {
    return data.toString();
  }

  if (typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(serializeDocument);
  }

  const serialized = {};
  for (const [key, value] of Object.entries(data)) {
    serialized[key] = serializeDocument(value);
  }
  return serialized;
}

/**
 * Alternative method using JSON.parse/stringify
 * This also handles circular references and other non-serializable objects
 */
export function serializeDocumentStrict(data) {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch {
    return serializeDocument(data);
  }
}
