import request from 'supertest';
import matchers from 'jest-supertest-matchers';
import server from '../server/server';

describe('requests', () => {
  const app = server();
  beforeAll(() => {
    jasmine.addMatchers(matchers);
  });
  it('GET tasks', async () => {
    const res = await request(app).get('/api/v1/tasks');
    expect(res).toHaveHTTPStatus(200);
  });
  it('POST tasks', async () => {
    const res = await request(app)
      .post('/api/v1/tasks')
      .send({ task: { text: 'task1', taskIndex: 1 } });
    expect(res).toHaveHTTPStatus(201);
  });
  it('PATCH tasks/:id', async () => {
    const res2 = await request(app)
      .patch('/api/v1/tasks/1')
      .send({ task: { text: 'edited-task1', taskIndex: 1 } });
    expect(res2).toHaveHTTPStatus(204);
  });
  it('DELETE tasks/:id', async () => {
    await request(app)
      .post('/api/v1/tasks')
      .send({ task: { text: 'task2', taskIndex: 2 } });
    const res2 = await request(app)
      .delete('/api/v1/tasks/2');
    expect(res2).toHaveHTTPStatus(204);
  });
});
