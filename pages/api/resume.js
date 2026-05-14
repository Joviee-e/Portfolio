import clientPromise from "../../lib/server/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const client = await clientPromise;

    const db = client.db("portfolio");

    const resumeCollection = db.collection("resume");

    const resume = await resumeCollection.findOne({
      key: "active",
    });

    if (!resume) {
      return res.status(404).json({
        error: "Resume not found",
      });
    }

    if (!resume.data) {
      return res.status(404).json({
        error: "Resume file missing",
      });
    }

    let pdfBuffer;

    // Handle MongoDB Binary properly
    if (resume.data.buffer) {
      pdfBuffer = Buffer.from(resume.data.buffer);
    } else {
      pdfBuffer = Buffer.from(resume.data);
    }

    res.setHeader(
      "Content-Type",
      resume.mimeType || "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${
        resume.filename || "resume.pdf"
      }"`
    );

    res.setHeader(
      "Content-Length",
      pdfBuffer.length
    );

    res.setHeader(
  "Cache-Control",
  "no-store, no-cache, must-revalidate, proxy-revalidate"
);

res.setHeader("Pragma", "no-cache");

res.setHeader("Expires", "0");

res.setHeader("Surrogate-Control", "no-store");

    return res.status(200).send(pdfBuffer);

  } catch (error) {
    console.error("Resume API Error:", error);

    return res.status(500).json({
      error: "Failed to retrieve resume",
      details: error.message,
    });
  }
}