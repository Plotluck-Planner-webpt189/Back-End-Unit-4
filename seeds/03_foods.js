exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('foods')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('foods').insert([
        { food_id: 1, title: 'Roasted Chicken', type: 'main dish', potluck_id: 1, user_id: 1 },
        { food_id: 2, title: 'Mashed Potatoes', type: 'side dish', potluck_id: 2, user_id: 2 },
        { food_id: 3, title: 'Spinakopita', type: 'appetizer', potluck_id: 3, user_id: 3 },
      ]);
    });
};
