const nodemailer = require('nodemailer');

/**
 * Creates an executive-branded HTML email template matching official CMAOF corporate brand tokens.
 */
const wrapInCmaofTemplate = (title, contentHtml) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title || 'Chief Michael Ade.Ojo Foundation'}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF6EE; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #3D1E10;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #FAF6EE; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #FFFFFF; border-radius: 20px; overflow: hidden; border: 1px solid #EFE8DC; box-shadow: 0 4px 16px rgba(91, 46, 25, 0.06);" cellspacing="0" cellpadding="0">
          
          <!-- Top Brand Header Bar -->
          <tr>
            <td style="background-color: #5B2E19; padding: 24px 32px; text-align: left;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="display: inline-block; width: 6px; height: 24px; background-color: #FCCD37; border-radius: 3px; vertical-align: middle; margin-right: 10px;"></span>
                    <span style="color: #FFFFFF; font-size: 17px; font-weight: 900; letter-spacing: 0.5px; vertical-align: middle;">CHIEF MICHAEL ADE.OJO FOUNDATION</span>
                  </td>
                </tr>
              </table>
              <div style="color: #FCCD37; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-top: 6px; padding-left: 16px;">
                Stronger People • Brighter Communities
              </div>
            </td>
          </tr>

          <!-- Primary Body Content -->
          <tr>
            <td style="padding: 32px; font-size: 14px; line-height: 1.6; color: #475569;">
              ${contentHtml}
            </td>
          </tr>

          <!-- The 4 Official Pillars Strip -->
          <tr>
            <td style="background-color: #FAF6EE; padding: 20px 32px; border-top: 1px solid #EFE8DC; border-bottom: 1px solid #EFE8DC;">
              <p style="margin: 0 0 10px 0; font-size: 11px; font-weight: 900; color: #5B2E19; text-transform: uppercase; letter-spacing: 1px;">
                Four Official Foundation Pillars:
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size: 11px; color: #5B2E19;">
                <tr>
                  <td style="padding: 3px 0;"><strong>• Education & Opportunity:</strong> Learn → Develop → Excel</td>
                </tr>
                <tr>
                  <td style="padding: 3px 0;"><strong>• Health & Wellbeing:</strong> Prevent → Treat → Restore</td>
                </tr>
                <tr>
                  <td style="padding: 3px 0;"><strong>• Humanitarian Support:</strong> Relieve → Rebuild → Sustain</td>
                </tr>
                <tr>
                  <td style="padding: 3px 0;"><strong>• Economic Empowerment:</strong> Empower → Produce → Thrive</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Institutional Footer -->
          <tr>
            <td style="background-color: #FAF6EE; padding: 24px 32px; font-size: 11px; color: #64748B; text-align: center; line-height: 1.5;">
              <p style="margin: 0 0 4px 0; font-weight: bold; color: #5B2E19;">Chief Michael Ade.Ojo Foundation (CMAOF)</p>
              <p style="margin: 0 0 12px 0;">Ilara-Mokin, Ondo State & Lagos Central Operations Headquarters, Nigeria</p>
              <p style="margin: 0; color: #94A3B8; font-size: 10px;">
                This is an official communication dispatched from CMAOF Secretariat. Please do not reply directly to this automated email.
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
};

/**
 * Robust SMTP & Google Workspace email dispatcher with automatic fallback
 */
const sendEmail = async (options) => {
  const {
    email,
    subject = 'Notice from Chief Michael Ade.Ojo Foundation',
    message = '',
    html = '',
  } = options;

  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
  const smtpUser = process.env.SMTP_EMAIL;
  const smtpPass = process.env.SMTP_PASSWORD;
  const fromName = process.env.FROM_NAME || 'Chief Michael Ade.Ojo Foundation';
  const fromEmail = process.env.FROM_EMAIL || smtpUser || 'info@cmaofoundation.org';

  const wrappedHtml = wrapInCmaofTemplate(subject, html || `<p>${message.replace(/\n/g, '<br/>')}</p>`);

  // Check if live credentials exist
  if (smtpUser && smtpPass) {
    try {
      const isPort465 = smtpPort === 465;

      const transporterConfig = {
        host: smtpHost,
        port: smtpPort,
        secure: isPort465, // true for 465, false for 587
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
      };

      const transporter = nodemailer.createTransport(transporterConfig);

      const mailOptions = {
        from: `"${fromName}" <${fromEmail}>`,
        to: email,
        subject,
        text: message || 'Please view this message in an HTML-compatible email reader.',
        html: wrappedHtml,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`✓ Email dispatched successfully to ${email} (Message ID: ${info.messageId})`);
      return { success: true, messageId: info.messageId };
    } catch (err) {
      console.warn(`⚠️  Live SMTP dispatch notice to ${email} (${err.message}). Logging message locally.`);
      return {
        success: false,
        simulated: true,
        error: err.message,
        to: email,
        subject,
      };
    }
  } else {
    // Development / fallback simulation
    console.log(`[EMAIL SIMULATION] To: ${email} | Subject: "${subject}"`);
    return {
      success: true,
      simulated: true,
      to: email,
      subject,
    };
  }
};

module.exports = sendEmail;
