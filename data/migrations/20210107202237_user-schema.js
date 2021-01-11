exports.up = function (knex) {
  return knex.schema.createTable('users', (tbl) => {
    tbl.increments('id');
    tbl.string('username', 25).unique().notNullable();
    tbl.string('email', 30).notNullable();
    tbl.string('password', 125).notNullable();
    tbl.string('firstname', 25).notNullable();
    tbl.string('lastname', 25).notNullable();
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());
    tbl.integer('potluck_id').references('id').inTable('potlucks');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
