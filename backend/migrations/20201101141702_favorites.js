
exports.up = function(knex) {
    return knex.schema.createTable("favorites", table => {
        table.integer("id_client").notNull().references("id").inTable("clients")
        table.integer("id_provider").notNull().references("id").inTable("providers")
        table.primary(["id_client", "id_provider"])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("favorites");
};
