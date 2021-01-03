const db = require('../data/dbConfig');

const find = (id) => {
    return db('users_potluck_food')
        .innerJoin('foods', 'foods.id', '=', 'users_potluck_food.food_id')
        .select('foods.name')
        .where('users_potluck_food.user_id', '=', id)
        
};

const findBy = (user_id, food_id) => {
    return db('users_potluck_food').where({user_id, food_id}).first();
};

const add = (data) => {
    return db('users_potluck_food').insert(data)
        .then(ids => {
        console.log(ids); 
        return findBy(data.user_id, data.food_id);
        })
};


const remove = (user_id, food_id) => {
    return db('users_potluck_food').where({user_id, food_id}).del();
};

module.exports = {
    find, 
    findBy,
    add,
    remove
  };