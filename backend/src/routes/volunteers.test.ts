import request from 'supertest';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { app } from '../app.js';
import { sequelize } from '../db.js';
import { Volunteer } from '../models/volunteer.js';

beforeEach(async () => {
  await Volunteer.destroy({ truncate: true, restartIdentity: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('GET /api/volunteers', () => {
  it('lists volunteers by shift date', async () => {
    await Volunteer.bulkCreate([
      { name: 'Later Volunteer', email: 'later@example.com', shiftDate: '2030-06-02' },
      { name: 'Earlier Volunteer', email: 'earlier@example.com', shiftDate: '2030-06-01' },
    ]);

    const response = await request(app).get('/api/volunteers');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject([
      { name: 'Earlier Volunteer', email: 'earlier@example.com', shiftDate: '2030-06-01' },
      { name: 'Later Volunteer', email: 'later@example.com', shiftDate: '2030-06-02' },
    ]);
  });
});

describe('POST /api/volunteers', () => {
  it('creates a volunteer', async () => {
    const response = await request(app)
      .post('/api/volunteers')
      .send({ name: 'New Volunteer', email: 'new@example.com', shiftDate: '2030-06-01' });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ id: 1, name: 'New Volunteer', shiftDate: '2030-06-01' });
    expect(await Volunteer.count()).toBe(1);
  });

  it('rejects an invalid body', async () => {
    const response = await request(app)
      .post('/api/volunteers')
      .send({ name: '', email: 'not-an-email', shiftDate: 'tomorrow' });

    expect(response.status).toBe(400);
    expect(Object.keys(response.body.errors).sort()).toEqual(['email', 'name', 'shiftDate']);
    expect(await Volunteer.count()).toBe(0);
  });
});
