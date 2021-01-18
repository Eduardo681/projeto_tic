
exports.up = function(knex) {
    return knex.schema.createTable("certificates", table => {
        table.increments("id").primary().notNull()
        table.integer("id_provider").notNull().references("id").inTable("providers")
        table.string("description").notNull()
        table.string("certificate").notNull()
    })
  };
  
  exports.down = function(knex) { 
      return knex.schema.dropTable("certificates");
  };
  