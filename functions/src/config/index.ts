import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env' : '.env.local',
});

export const config = {
  dynamodb: {
    region: process.env.DYNAMODB_REGION,
    tables: {
      users: process.env.DYNAMODB_USERS_TABLE,
      notes: process.env.DYNAMODB_NOTES_TABLE,
    },
  },
  mail: {
    sender: {
      email: process.env.SENDER_EMAIL,
      name: process.env.SENDER_NAME,
    },
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    verifyEmailExpiresIn: process.env.JWT_VERIFY_EMAIL_EXPIRES_IN,
    resetPasswordExpiration: process.env.JWT_RESET_PASSWORD_EXPIRATION,
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  },
};
