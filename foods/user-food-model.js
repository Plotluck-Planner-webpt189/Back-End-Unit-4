const db = require('../data/dbConfig');

module.exports = {
    find, 
    findBy,
    add,
    remove
};

const find = (id) => {
    return db('users_food')
        .innerJoin('food', 'food.id', '=', 'users_food.food_id')
        .select('food.name')
        .where('users_food.user_id', '=', id)
};

const findBy = (user_id, food_id) => {
    return db('users_food').where({user_id, food_id}).first();
};

const add = (data) => {
    return db('users_food').insert(data)
        .then(ids => {
        console.log(ids); 
        return findBy(data.user_id, data.food_id);
        })
};

const remove = (user_id, food_id) => {
    return db('users_food').where({user_id, food_id}).del();
};

