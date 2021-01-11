const bcryot = require('bcryptjs');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { user_id: 1, username: 'mitch', password: bcrypt.hashSynch ("password", 10), email: 'mitch@tester.com', firstName: 'mitch', lastName: 'tester'},
        { user_id: 2, username: 'aaron', password: bcrypt.hashSynch ("password", 10), email: 'aaron@tester1.com', firstName: 'aaron', lastName: 'tester1' },
        { user_id: 3, username: 'luigi', password: bcrypt.hashSynch ("password", 10), email: 'luigi@tester2.com', firstName: 'luigi', lastName: 'tester2' },
      ]);
    });
};
