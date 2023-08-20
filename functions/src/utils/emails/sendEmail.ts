import { config } from '../../config';
import nodemailer from 'nodemailer';
import { verifyEmailTemplate } from './templates/verifyEmail';
import { welcomeEmailTemplate } from './templates/welcome';
import { resetPasswordTemplate } from './templates/resetPassword';

export const replaceVariable = (html: string, variable: string, value: string) => {
  const regex = new RegExp(`{{ ${variable} }}`, 'g');
  return html.replace(regex, value);
};

const logoUrl = 'https://cdn-icons-png.flaticon.com/512/8860/8860785.png';
const appName = 'Pasteline';
const emailSupport = 'support@pasterlineapp.com';
const unsubscribeLink = 'about:blank';
const appUrl = config.app.url;

const transporter = nodemailer.createTransport({
  host: config.mail.smtp.host,
  port: config.mail.smtp.port,
  secure: true,
  auth: {
    user: config.mail.smtp.user,
    pass: config.mail.smtp.pass,
  },
});

export const sendVerifyEmail = (toEmail: string, verifyLink: string) => {
  let htmlTemplate = replaceVariable(verifyEmailTemplate, 'verifyLink', verifyLink);
  htmlTemplate = replaceVariable(htmlTemplate, 'logoUrl', logoUrl);
  htmlTemplate = replaceVariable(htmlTemplate, 'appName', appName);
  htmlTemplate = replaceVariable(htmlTemplate, 'emailSupport', emailSupport);
  htmlTemplate = replaceVariable(htmlTemplate, 'unsubscribeLink', unsubscribeLink);

  return transporter.sendMail({
    from: `"${config.mail.sender.name}" <${config.mail.sender.email}>`,
    to: toEmail,
    subject: 'Verify email address',
    html: htmlTemplate,
  });
};

export const sendWelcomeEmail = (toEmail: string) => {
  let htmlTemplate = replaceVariable(welcomeEmailTemplate, 'logoUrl', logoUrl);
  htmlTemplate = replaceVariable(htmlTemplate, 'appName', appName);
  htmlTemplate = replaceVariable(htmlTemplate, 'emailSupport', emailSupport);
  htmlTemplate = replaceVariable(htmlTemplate, 'unsubscribeLink', unsubscribeLink);
  htmlTemplate = replaceVariable(htmlTemplate, 'toEmail', toEmail);
  htmlTemplate = replaceVariable(htmlTemplate, 'appUrl', appUrl);

  return transporter.sendMail({
    from: `"${config.mail.sender.name}" <${config.mail.sender.email}>`,
    to: toEmail,
    subject: 'Welcome to ' + appName,
    html: htmlTemplate,
  });
};

export const sendResetPasswordEmail = (toEmail: string, linkResetToken: string) => {
  let htmlTemplate = replaceVariable(resetPasswordTemplate, 'linkResetToken', linkResetToken);
  htmlTemplate = replaceVariable(htmlTemplate, 'logoUrl', logoUrl);
  htmlTemplate = replaceVariable(htmlTemplate, 'appName', appName);
  htmlTemplate = replaceVariable(htmlTemplate, 'unsubscribeLink', unsubscribeLink);

  return transporter.sendMail({
    from: `"${config.mail.sender.name}" <${config.mail.sender.email}>`,
    to: toEmail,
    subject: 'Reset password',
    html: htmlTemplate,
  });
};
