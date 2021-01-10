
exports.up = function(knex) {
    return knex.schema.createTable('foods', tbl => {
      tbl.increments('id');
      tbl.string('title', 25).notNullable();
      tbl.string('type').notNullable();
      tbl.integer('potluck_id').references('id').inTable('potlucks');
    });
  
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('foods');
};
