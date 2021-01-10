exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('foods')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('foods').insert([
        { food_id: 1, title: 'Roasted Chicken', type: 'main dish' },
        { food_id: 2, title: 'Mashed Potatoes', type: 'side dish' },
        { food_id: 3, title: 'Spinakopita', type: 'appetizer' },
      ]);
    });
};
