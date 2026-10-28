const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // If SMTP configuration exists, send real email
  if (process.env.SMTP_HOST && process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const message = {
      from: `${process.env.FROM_NAME || 'Chief Michael Ade.Ojo Foundation'} <${process.env.FROM_EMAIL || 'info@cmaofoundation.org'}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html,
    };

    const info = await transporter.sendMail(message);
    console.log(`Email dispatched: ${info.messageId}`);
    return info;
  } else {
    // Development / fallback mode: simulate email sending
    console.log(`[EMAIL SIMULATION] To: ${options.email} | Subject: "${options.subject}"`);
    return { simulated: true, to: options.email, subject: options.subject };
  }
};

module.exports = sendEmail;
