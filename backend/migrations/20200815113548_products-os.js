
exports.up = function (knex) {
    return knex.schema.createTable("products_os", table => {
        table.integer("id_os").notNull().references("id").inTable("os")
        table.integer("id_product").notNull().references("id").inTable("products")
        table.primary(["id_os", "id_product"])
        table.integer("amount").notNull()
        table.double("value_unitary")
        table.double("value_totaly")
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("products_os");
};
