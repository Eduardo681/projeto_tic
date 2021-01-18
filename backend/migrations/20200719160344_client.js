
exports.up = function(knex) {
    return knex.schema.createTable('clients', table => {
        table.increments("id").primary().references("id").inTable("users").notNull().notNullable().unsigned().onDelete('CASCADE')
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("clients")
};
