const db = require('../data/dbConfig');

const { add } = require('./potluck-model');

describe('potlucks model', () => {
  describe('insert', () => {
    beforeEach(async () => {
      await db('potlucks').truncate();
    });

    it('should insert a potluck', async () => {
      await add({name:'Testing', location: 'testing', date: 'testing', time: 'testing'});

      const potlucks = await db('potlucks');
      expect(potlucks).toHaveLength(1);
    });

    it('should insert provided potluck', async () => {
      await add({name:'Testing1', location: 'testing1', date: 'testing1', time: 'testing1'});
      await add({name:'holiday', location: 'LasVegas', date: '12/24/2021', time: '6pm'});

      const potlucks = await db('potlucks');

      expect(potlucks).toHaveLength(2);
      expect(potlucks[0].name).toBe('Testing');
      expect(potlucks[1].name).toBe('holiday');
    });

    it('should return the inserted potluck', async function() {
      let potluck = await add({name:'Easter', location: 'Tennessee', date: '07/04/2021', time: '6pm'});
      expect(potluck.name).toBe('Easter');
      expect(potluck.id).toBeDefined(); 

      potluck = await add({name:'Halloween', location: 'New York', date: '10/29/2021', time: '6pm'});
      expect(potluck.name).toBe('Halloween');
      expect(potluck.id).toBeDefined();
    });

  });
});