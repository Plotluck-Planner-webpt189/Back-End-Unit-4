
exports.up = function(knex) {
    return knex.schema.createTable('potlucks', tbl => {
        tbl.increments('id');
        tbl.string('eventName', 25).notNullable();
        tbl.string('date').notNullable();
        tbl.string('locationVenue').notNullable();
        tbl.string('time').notNullable();
    });
  
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('potlucks');
};
