import { SendEmailCommand } from '@aws-sdk/client-ses';
import { SESClient } from '@aws-sdk/client-ses';
import { config } from '../../config';

const client = new SESClient({ region: config.ses.region });

const createSendEmailCommand = (toAddress: string, link: string): SendEmailCommand => {
  return new SendEmailCommand({
    Destination: {
      CcAddresses: [],
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `<div><h2>Verify your email</h2><p>To continue using app. Please click this link below to verify your email:</p><a href="${link}" target="_blank">${link}</a></div>`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Verification email address',
      },
    },
    Source: config.ses.sender,
    ReplyToAddresses: [],
  });
};

export const sendEmail = (toEmail: string, verifyLink: string) => {
  return createSendEmailCommand(toEmail, verifyLink);
};
