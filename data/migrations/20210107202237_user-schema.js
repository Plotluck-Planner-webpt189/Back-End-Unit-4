exports.up = function (knex) {
  return knex.schema.createTable('users', (tbl) => {
    tbl.increments('id');
    tbl.string('name', 15).notNullable();
    tbl.string('email', 30).notNullable();
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());
    tbl.integer('potluck_id').references('id').inTable('potlucks');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
