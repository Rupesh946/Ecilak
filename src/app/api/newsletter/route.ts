import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Send a notification to the business owner about the new subscriber
    await resend.emails.send({
      from: "Ecilak Store <onboarding@resend.dev>",
      to: "ecilakbusiness@gmail.com",
      subject: "New Newsletter Subscriber!",
      html: `
        <h2>New Subscriber Alert!</h2>
        <p>A new user has joined the Ecilak world newsletter.</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
