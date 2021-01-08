
exports.up = function(knex) {
    return knex.schema.createTable('foods', tbl => {
        tbl.increments('id');
        tbl.string('name', 25).notNullable();
        tbl.string('type').notNullable();
    });
  
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('foods');
};
