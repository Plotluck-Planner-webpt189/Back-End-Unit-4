const db = require('../data/dbConfig');

const find = () => {
  return db('foods');
};

const findById = (id) => {
  return db('foods').where({id}).first();
};

const add = (foodData) => {
  return db('foods').insert(foodData, 'id')
    .then(ids => {
      console.log(ids);
      return findById(ids[0]);
    })
};

module.exports = {
  find,
  findById,
  add, 
};
