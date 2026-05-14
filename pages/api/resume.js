import { getResume } from '../../lib/server/portfolioData';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const resume = await getResume();
    
    if (!resume?.data) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    const buffer = resume.data.buffer || resume.data;
    res.setHeader('Content-Type', resume.mimeType || 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${resume.filename || 'resume.pdf'}"`);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    
    return res.status(200).send(buffer);
  } catch (err) {
    console.error('Error serving resume:', err);
    return res.status(500).json({ error: 'Failed to retrieve resume' });
  }
}
