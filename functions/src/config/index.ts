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
      email: 'noreply@pasteline.com',
      name: 'Pasteline App 📝',
    },
    smtp: {
      host: '',
      port: 465,
      user: '',
      pass: '',
    },
  },
  jwt: {
    secret: '75186ae9d2b71f54360d',
    expiresIn: '1d',
  },
  app: {
    url: 'http://localhost:5173',
  }
};
