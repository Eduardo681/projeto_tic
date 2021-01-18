
exports.up = function(knex) {
    return knex.schema.createTable("services_provider", table => {
        table.integer("id_service").notNull().references("id").inTable("services").notNullable().unsigned().onDelete('CASCADE');
        table.integer("id_provider").notNull().references("id").inTable("providers").notNullable().unsigned().onDelete('CASCADE');
        table.primary(["id_service", "id_provider"])
        table.float("rate")
    })
  };
  
  exports.down = function(knex) { 
      return knex.schema.dropTable("services_provider");
  };
  