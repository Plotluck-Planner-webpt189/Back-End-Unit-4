exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { user_id: 1, name: 'Tessie', email: 'tessie@tester.com' },
        { user_id: 2, name: 'Mario', email: 'mario@tester.com' },
        { user_id: 3, name: 'Luigi', email: 'luigi@tester.com' },
      ]);
    });
};
