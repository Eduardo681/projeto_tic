
exports.up = function(knex) {
  return knex.schema.createTable("services", table => {
      table.increments("id").primary().notNull()
      table.string("title_service").notNull()
      table.string("description").notNull()
  })
};

exports.down = function(knex) { 
    return knex.schema.dropTable("services");
};
