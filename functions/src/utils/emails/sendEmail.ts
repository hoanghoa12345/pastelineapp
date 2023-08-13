import { config } from '../../config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: config.mail.smtp.host,
  port: config.mail.smtp.port,
  secure: true,
  auth: {
    user: config.mail.smtp.user,
    pass: config.mail.smtp.pass,
  },
});

export const sendEmail = (toEmail: string, verifyLink: string) => {
  return transporter.sendMail({
    from: `"${config.mail.sender.name}" <${config.mail.sender.email}>`,
    to: toEmail,
    subject: 'Verify email address',
    html: `
    <div style="border: 1px solid #949494; padding: 16px; margin: 8px">
      <p style="font-family:Helvetica,Arial,sans-serif;">Please click the link below to confirm your email address</p>
      <p style="font-family:Helvetica,Arial,sans-serif;">
        <a href="${verifyLink}" target="_blank">Verify your email</a>
      </p>
    </div>
    `,
  });
};
