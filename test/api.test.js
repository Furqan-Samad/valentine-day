const request = require('supertest');
const app = require('../valentine');

describe('API endpoints', () => {
  it('GET /valentine -> returns message', async () => {
    const res = await request(app).get('/valentine').expect('Content-Type', /json/).expect(200);
    if (!res.body || typeof res.body.message !== 'string') throw new Error('Invalid /valentine response');
  });

  it('GET /message -> returns message', async () => {
    const res = await request(app).get('/message').expect('Content-Type', /json/).expect(200);
    if (!res.body || typeof res.body.message !== 'string') throw new Error('Invalid /message response');
  });

  it('POST /memory -> saves memory', async () => {
    const payload = { memory: 'First kiss', time: new Date().toISOString() };
    const res = await request(app).post('/memory').send(payload).expect(200);
    if (!res.body || res.body.totalMemories < 1) throw new Error('Memory not saved');
  });

  it('POST /save -> saves answer', async () => {
    const payload = { answer: 'YES', time: new Date().toISOString() };
    const res = await request(app).post('/save').send(payload).expect(200);
    if (!res.body || res.body.totalResponses < 1) throw new Error('Answer not saved');
  });
});
