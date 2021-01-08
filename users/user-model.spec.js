const db = require('../data/dbConfig');

const { add } = require('./user-model');

describe('users model', () => {
  describe('insert', () => {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it('should insert a user', async () => {
      await add({firstName:'Mitch', lastName: 'Tester', username: 'mitch', 'password': 'tester'});

      const users = await db('users');
      expect(users).toHaveLength(1);
    });

    it('should insert provided user', async () => {
      await add({firstName:'Mitch', lastName: 'Tester', username: 'mitch', 'password': 'tester'});
      await add({firstName:'Mizzy', lastName: 'Testing', username: 'mizzy', 'password': 'testing'});

      const users = await db('users');

      expect(users).toHaveLength(2);
      expect(users[0].username).toBe('mitch');
      expect(users[1].username).toBe('mizzy');
    });
  });
});