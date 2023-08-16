export const config = {
  dynamodb: {
    region: 'ap-southeast-1',
    tables: {
      users: 'users',
      notes: 'notes',
    },
  },
  ses: {
    region: '',
    sender: '',
  },
  mail: {
    sender: {
      email: '8d48c3d528-3b93d7@inbox.mailtrap.io',
      name: 'Pasteline App 📝',
    },
    smtp: {
      host: 'sandbox.smtp.mailtrap.io',
      port: 25,
      user: 'cda88e731a9c21',
      pass: '3ef9e7acd36df1',
    },
  },
  jwt: {
    secret: '75186ae9d2b71f54360d',
    expiresIn: '1d',
  }
};
