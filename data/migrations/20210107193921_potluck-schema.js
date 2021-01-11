
exports.up = function(knex) {
    return knex.schema.createTable('potlucks', tbl => {
      tbl.increments('id');
      tbl.string('name', 25).unique().notNullable();
      tbl.string('date').notNullable();
      tbl.string('time').notNullable();
      tbl.string('location', 126).notNullable();
      tbl.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
    });
  
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('potlucks');
};
