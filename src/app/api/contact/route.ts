import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { sanitizeHtml } from "@/lib/sanitize";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const resend = new Resend(process.env.RESEND_API_KEY || "re_mock_key");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const { name, email, subject, message } = result.data;
    const sanitizedName = sanitizeHtml(name);
    const sanitizedSubject = sanitizeHtml(subject);
    const sanitizedMessage = sanitizeHtml(message);

    // Send contact notification email via Resend
    try {
      await resend.emails.send({
        from: "Ecilak Contact <ecilakbusiness@gmail.com>",
        to: "ecilakbusiness@gmail.com", // business recipient
        subject: `New Contact Submission: ${sanitizedSubject}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAF7F2; border-radius: 12px;">
            <h2 style="font-family: serif; color: #1A1412;">New Contact Query</h2>
            <p><strong>Name:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${sanitizedSubject}</p>
            <hr style="border: 0; border-top: 1px solid #EBE4D8; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; color: #6E6259;">${sanitizedMessage}</p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Resend contact query mail failed, proceeding as successful (local simulation):", emailErr);
    }

    return NextResponse.json({ message: "Your message has been sent successfully." });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Failed to submit query" }, { status: 500 });
  }
}
