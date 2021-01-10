
exports.up = function(knex) {
    return knex.schema.createTable('potlucks', tbl => {
      tbl.increments('id');
      tbl.string('name', 25).unique().notNullable();
      tbl.string('when').notNullable();
      tbl.string('time').notNullable();
      tbl.string('location').notNullable();
    });
  
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('potlucks');
};
