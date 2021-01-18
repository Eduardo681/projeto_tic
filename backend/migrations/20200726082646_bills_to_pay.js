
exports.up = function (knex) {
    return knex.schema.createTable("bills_to_pay", table => {
        table.increments("id").primary().notNull()
        table.integer("id_adm").references("id").inTable("adm").notNull()
        table.integer("id_os").references("id").inTable("os").notNull()
        table.double("commission")
        table.date("transfer_date")
        table.string("status_pay")
        table.string("email")
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("bills_to_pay");
};
 