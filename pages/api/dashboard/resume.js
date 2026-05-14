import formidable from 'formidable';
import fs from 'fs';
import { replaceResume } from '../../../lib/server/portfolioData';

export const config = {
  api: {
    bodyParser: false,
  },
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({ 
    multiples: false, 
    maxFileSize: MAX_FILE_SIZE,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      if (err.code === 'REQUEST_ENTITY_TOO_LARGE') {
        return res.status(413).json({ error: 'File too large. Maximum 5MB.' });
      }
      console.error('Upload parse error:', err);
      return res.status(400).json({ error: 'Upload failed' });
    }

    const file = files.resume;
    const uploaded = Array.isArray(file) ? file[0] : file;

    if (!uploaded) {
      return res.status(400).json({ error: 'Resume file is required' });
    }

    // Validate file type
    if (uploaded.mimetype !== 'application/pdf') {
      return res.status(400).json({ error: 'Only PDF files are allowed' });
    }

    // Validate file size
    if (uploaded.size > MAX_FILE_SIZE) {
      return res.status(413).json({ error: 'File exceeds maximum size of 5MB' });
    }

    try {
      const fileBuffer = fs.readFileSync(uploaded.filepath);
      const result = await replaceResume({ 
        filename: uploaded.originalFilename || 'resume.pdf', 
        mimeType: uploaded.mimetype, 
        fileBuffer 
      });
      if (!result?.ok) {
        return res.status(503).json({ error: 'Database unavailable. Resume was not saved.' });
      }

      return res.status(200).json({ ok: true });
    } catch (error) {
      console.error('Resume upload error:', error);
      return res.status(503).json({ error: 'Database unavailable. Resume was not saved.' });
    } finally {
      // Clean up temp file
      try {
        fs.unlinkSync(uploaded.filepath);
      } catch (e) {
        // Ignore cleanup errors
      }
    }
  });
}
