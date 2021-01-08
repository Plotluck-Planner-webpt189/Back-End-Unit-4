const cleaner = require("knex-cleaner");

exports.seed = async function(knex) {
  await cleaner.clean(knex);
};