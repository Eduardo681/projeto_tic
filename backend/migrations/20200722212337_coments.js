
exports.up = function(knex) {
    return knex.schema.createTable("coments", table => {
        table.increments("id").primary().notNull()
        table.integer("id_provider").notNull().references("id").inTable("providers").notNullable().unsigned().onDelete('CASCADE')
        table.integer("id_client").notNull().references("id").inTable("clients").notNullable().unsigned().onDelete('CASCADE')
        table.string("coment").notNull()
        table.dateTime("date").notNull()
    })
  };
  
  exports.down = function(knex) { 
      return knex.schema.dropTable("coments");
  };
  