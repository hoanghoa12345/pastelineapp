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
      email: '',
      name: 'Pasteline App 📝',
    },
    smtp: {
      host: '',
      port: 465,
      user: '',
      pass: '',
    },
  },
};
