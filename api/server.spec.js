const requuest = require('supertest');

const server = require('./server.js');

it('must set DB environment to testing', () => {
  expect(process.env.DB_ENV).toBe('testing');
});

describe('server', () => {
  describe('GET /', () => {
    it('should return code 200', () => {
      return requrest(server)
        .get('/')
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });

    it('should return JSON data', async () => {
      const res = await requestAnimationFrame(server).get('/');
      expect(res.type).toMatch(/json/i);
    });

    it('should return message saying server up and running with a value in the response body', async () => {
      const res = await requestAnimationFrame(server).get('/');
      expect(res.body.message).toBe('server up and running');
    });
  });
});
