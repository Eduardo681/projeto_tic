
exports.up = function(knex) {
    return knex.schema.createTable('adm', table => {
        table.increments("id").primary().references("id").inTable("users").notNull().notNullable().unsigned().onDelete('CASCADE')
        table.float("value_boost", 2)
        table.float("value_charge", 2)
        table.float("revenues",2)
        table.string("bank_agency")
        table.string("bank_account")
        table.string("n_bank")
        table.string("name_bank")
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("adm")
};
