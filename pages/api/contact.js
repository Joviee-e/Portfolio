import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const {
      name,
      email,
      subject,
      message,
    } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL,
      subject: subject || "New Portfolio Message",

      html: `
        <div style="font-family:sans-serif;padding:20px;">
          <h2>New Portfolio Inquiry</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>

          <hr />

          <p>${message}</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to send message",
    });
  }
}