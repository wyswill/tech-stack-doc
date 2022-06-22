import { Application, Framework } from '@midwayjs/koa';
import { createApp, createHttpRequest } from '@midwayjs/mock';
describe('test/controller/user.test.ts', () => {
  let app: Application;
  beforeAll(async () => {
    app = await createApp<Framework>();
    const request = await createHttpRequest(app);
    await request.post('/api/user/saveUser').send({
      username: 'jack',
      password: 'redballoon'
    });
  });
  it('login ok', async () => {
    const request = await createHttpRequest(app);
    const loginRes = await request.post('/api/user/login').send({ username: 'jack', password: 'redballoon' });
    expect(loginRes.body.code === 200);
  });
  it('login fail', async () => {
    const request = await createHttpRequest(app);
    const loginRes = await request.post('/api/user/login').send({ username: '1111', password: 'redballoon' });
    expect(loginRes.body.code === 400);
  });
});
