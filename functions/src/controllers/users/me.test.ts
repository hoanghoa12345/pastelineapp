import 'mocha';
import { expect } from 'chai';
import { agent as request } from 'supertest';
import { app } from '../../app';

describe('Me', () => {
  it('should return a response 200', async () => {
    const res = await request(app).get('/api/v1/users/me');
    expect(res.status).to.equal(200);
  });
});
