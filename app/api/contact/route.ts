import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const cleanSubject =
      typeof subject === "string" && subject.trim()
        ? subject.trim()
        : "Website enquiry";

    await resend.emails.send({
      from: "Website Contact <onboarding@resend.dev>",
      to: ["mikeykbrown@gmail.com"],
      replyTo: email,
      subject: `[Website] ${cleanSubject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Unable to send message." },
      { status: 500 }
    );
  }
}