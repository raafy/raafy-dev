export const OTPEmailTemplate = ({
  code,
  expiresInMinutes = 5,
}: {
  code: string;
  expiresInMinutes?: number;
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Admin Login Code</title>
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
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Admin Login Code</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                Hello,
              </p>

              <p style="margin: 0 0 30px; color: #333333; font-size: 16px; line-height: 1.6;">
                You requested to log in to your admin portal. Use the code below to complete your login:
              </p>

              <!-- OTP Code Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center" style="padding: 30px; background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border-radius: 12px; border: 2px solid #e5e7eb;">
                    <div style="font-family: 'Courier New', monospace; font-size: 48px; font-weight: bold; color: #1a1a1a; letter-spacing: 8px; margin: 0;">
                      ${code}
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                This code will expire in <strong>${expiresInMinutes} minutes</strong>. If you didn't request this code, please ignore this email.
              </p>

              <!-- Security Warning -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td style="padding: 20px; background-color: #fef2f2; border-radius: 8px; border-left: 4px solid #ef4444;">
                    <p style="margin: 0 0 10px; color: #991b1b; font-size: 14px; font-weight: 600;">
                      🔒 Security Tip
                    </p>
                    <p style="margin: 0; color: #7f1d1d; font-size: 14px; line-height: 1.5;">
                      Never share this code with anyone. The admin team will never ask for your login code.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 0; color: #333333; font-size: 16px; line-height: 1.6;">
                Best regards,<br>
                <strong>Raafy Dev Admin System</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                This is an automated security email from <a href="https://raafy.dev" style="color: #2563eb; text-decoration: none;">raafy.dev</a>
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
