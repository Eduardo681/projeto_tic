
exports.up = function(knex) {
    return knex.schema.createTable('providers', table => {
        table.increments("id").primary().references("id").inTable("users").notNull().notNullable().unsigned().onDelete('CASCADE')
        table.boolean("validate")
        table.string("bank_agency")
        table.string("bank_account")
        table.string("n_bank")
        table.string("name_bank")
        table.boolean("boost").notNull()
        table.string("name_mom").notNull()
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("providers")
};
