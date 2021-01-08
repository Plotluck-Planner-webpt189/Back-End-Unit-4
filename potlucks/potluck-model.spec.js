const db = require('../data/dbConfig');

const { add } = require('./potluck-model');

describe('potlucks model', () => {
  describe('insert', () => {
    beforeEach(async () => {
      await db('potlucks').truncate();
    });

    it('should insert a potluck', async () => {
      await add({name:'Thanksgiving', location: 'DisneyWorld', date: '11/24/2021', time: '6pm'});

      const potlucks = await db('potlucks');
      expect(potlucks).toHaveLength(1);
    });

    it('should insert provided potluck', async () => {
      await add({name:'Thanksgiving', location: 'DisneyWorld', date: '11/24/2021', time: '6pm'});
      await add({name:'Christmas', location: 'LasVegas', date: '12/24/2021', 'time': '6pm'});

      const potlucks = await db('potlucks');

      expect(potlucks).toHaveLength(2);
      expect(potlucks[0].name).toBe('Thanksgiving');
      expect(potlucks[1].name).toBe('Christmas');
    });

    it('should return the inserted potluck', async function() {
      let potluck = await add({name:'Thanskgiving', location: 'DisneyWorld', date: '11/24/2021', 'time': '6pm'});
      expect(potluck.name).toBe('Thanksgiving');
      expect(potluck.id).toBeDefined(); 

      potluck = await add({name:'Christmas', location: 'LasVegas', date: '12/24/2021', 'time': '6pm'});
      expect(potluck.name).toBe('Christmas');
      expect(potluck.id).toBeDefined();
    });

  });
});