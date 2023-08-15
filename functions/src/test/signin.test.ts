import 'mocha';
import request from 'supertest';
import { app } from '../app';
import { expect } from 'chai';

describe('SignIn', () => {
  it('should return a jwt token', async () => {
    const response = await request(app)
      .post('/api/v1/users/signin')
      .send({
        email: '',
        password: '',
      })
      .expect(200);

    expect(response.body.data.access_token).to.be.a('string');
  });
});

describe('SignIn', () => {
  it('should return email is required on body', async () => {
    const response = await request(app)
      .post('/api/v1/users/signin')
      .send({
        password: '',
      })
      .expect(422);

    expect(response.body.errors[1].email).to.equal('Email field is required');
  });
})