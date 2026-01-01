import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Email template for admin notification
const AdminEmailTemplate = ({
  name,
  email,
  subject,
  phone,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  phone?: string;
  message: string;
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">New Contact Form Submission</h1>
              <p style="margin: 10px 0 0; color: #e0e0e0; font-size: 14px;">From raafy.dev</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom: 25px;">
                    <h3 style="margin: 0 0 8px; color: #1a1a1a; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Name</h3>
                    <p style="margin: 0; color: #333333; font-size: 16px; line-height: 1.5;">${name}</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding-bottom: 25px;">
                    <h3 style="margin: 0 0 8px; color: #1a1a1a; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email</h3>
                    <p style="margin: 0;"><a href="mailto:${email}" style="color: #2563eb; font-size: 16px; text-decoration: none;">${email}</a></p>
                  </td>
                </tr>

                ${
                  phone
                    ? `
                <tr>
                  <td style="padding-bottom: 25px;">
                    <h3 style="margin: 0 0 8px; color: #1a1a1a; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Phone</h3>
                    <p style="margin: 0;"><a href="tel:${phone}" style="color: #2563eb; font-size: 16px; text-decoration: none;">${phone}</a></p>
                  </td>
                </tr>
                `
                    : ""
                }

                <tr>
                  <td style="padding-bottom: 25px;">
                    <h3 style="margin: 0 0 8px; color: #1a1a1a; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Subject</h3>
                    <p style="margin: 0; color: #333333; font-size: 16px; line-height: 1.5;">${subject}</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding-bottom: 25px;">
                    <h3 style="margin: 0 0 8px; color: #1a1a1a; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Message</h3>
                    <div style="margin: 0; color: #333333; font-size: 16px; line-height: 1.6; background-color: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
                      ${message.replace(/\n/g, "<br>")}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                This email was sent from the contact form on <a href="https://raafy.dev" style="color: #2563eb; text-decoration: none;">raafy.dev</a>
              </p>
              <p style="margin: 10px 0 0; color: #9ca3af; font-size: 12px;">
                ${new Date().toLocaleString("en-US", {
                  dateStyle: "full",
                  timeStyle: "short",
                })}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// Auto-reply email template
const AutoReplyTemplate = ({ name }: { name: string }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank you for contacting me</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%); padding: 40px 30px; text-align: center;">
              <div style="font-family: 'Courier New', monospace; font-size: 36px; font-weight: bold; color: #ffffff; margin-bottom: 10px;">{R}</div>
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Thank You for Reaching Out!</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                Hi <strong>${name}</strong>,
              </p>

              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                Thank you for contacting me! I've received your message and will get back to you as soon as possible, usually within 24-48 hours.
              </p>

              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                In the meantime, feel free to:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
                <tr>
                  <td style="padding: 15px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #2563eb;">
                    <p style="margin: 0 0 10px; color: #1a1a1a; font-size: 15px;">📄 Check out my <a href="https://raafy.dev/resume" style="color: #2563eb; text-decoration: none;">resume</a></p>
                    <p style="margin: 0 0 10px; color: #1a1a1a; font-size: 15px;">💼 View my <a href="https://raafy.dev/projects" style="color: #2563eb; text-decoration: none;">projects</a></p>
                    <p style="margin: 0; color: #1a1a1a; font-size: 15px;">🔗 Connect on <a href="https://linkedin.com/in/raafyshiham" style="color: #2563eb; text-decoration: none;">LinkedIn</a></p>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0; color: #333333; font-size: 16px; line-height: 1.6;">
                Looking forward to connecting with you!
              </p>

              <p style="margin: 30px 0 0; color: #333333; font-size: 16px; line-height: 1.6;">
                Best regards,<br>
                <strong>Raafy Shiham</strong><br>
                <span style="color: #6b7280; font-size: 14px;">Software Developer</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 15px; color: #6b7280; font-size: 14px;">
                <a href="https://raafy.dev" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Website</a>
                <span style="color: #d1d5db;">•</span>
                <a href="https://github.com/raafy" style="color: #2563eb; text-decoration: none; margin: 0 10px;">GitHub</a>
                <span style="color: #d1d5db;">•</span>
                <a href="https://linkedin.com/in/raafyshiham" style="color: #2563eb; text-decoration: none; margin: 0 10px;">LinkedIn</a>
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                This is an automated response. Please do not reply to this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// Rate limiting (simple in-memory store)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimit.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return true;
  }

  if (limit.count >= 3) {
    // Max 3 requests per minute
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, email, subject, phone, message, turnstileToken } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Verify Turnstile token (if provided)
    if (turnstileToken && process.env.TURNSTILE_SECRET_KEY) {
      const turnstileResponse = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            secret: process.env.TURNSTILE_SECRET_KEY,
            response: turnstileToken,
          }),
        }
      );

      const turnstileData = await turnstileResponse.json();

      if (!turnstileData.success) {
        return NextResponse.json(
          { error: "Bot verification failed" },
          { status: 400 }
        );
      }
    }

    // Sanitize inputs
    const sanitizedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      phone: phone?.trim(),
      message: message.trim(),
    };

    // Send admin notification email
    const adminEmail = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.RESEND_TO_EMAIL!,
      subject: `New Contact: ${sanitizedData.subject}`,
      html: AdminEmailTemplate(sanitizedData),
    });

    if (adminEmail.error) {
      console.error("Failed to send admin email:", adminEmail.error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    // Send auto-reply to user
    const autoReply = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: sanitizedData.email,
      subject: "Thanks for reaching out!",
      html: AutoReplyTemplate({ name: sanitizedData.name }),
    });

    if (autoReply.error) {
      console.error("Failed to send auto-reply:", autoReply.error);
      // Don't fail the request if auto-reply fails
    }

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
