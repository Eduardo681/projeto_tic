
exports.up = function (knex) {
    return knex.schema.createTable("bills_to_receive", table => {
        table.increments("id").primary().notNull()
        table.integer("id_adm").references("id").inTable("adm").notNull()
        table.integer("id_os").references("id").inTable("os").notNull()
        table.string("pay_code") 
        table.string("type_receive")
        table.integer("parcel").notNull()
        table.double("value").notNull()
        table.double("discount")
        table.double("addition")
        table.double("value_to_pay").notNull()
        table.date("due_date")
        table.date("date_paid")
        table.string("status_pay")
        table.string("email")
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("bills_to_receive");
};
 