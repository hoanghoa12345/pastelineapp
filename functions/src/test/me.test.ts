import 'mocha';
import { expect } from 'chai';
import { agent as request } from 'supertest';
import { app } from '../app';

describe("Unauthenticated", () => {
  it("should return a 401 if not authenticated", async () => {
    const res = await request(app).get("/api/v1/users/me").expect(401);
    expect(res.body.message).to.equal("No Token");
  });
})

describe("Authenticated", () => {
  const token = '';
  it("should return a user if authenticated", async () => {
    const res = await request(app)
      .get("/api/v1/users/me")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
      expect(res.body.userId).to.be.a('string')
  });
})