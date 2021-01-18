
exports.up = function (knex) {
    return knex.schema.createTable("adresses", table => {
        table.increments("id").primary().notNull()
        table.integer("id_client").notNull().references("id").inTable("clients").notNullable().unsigned().onDelete('CASCADE')
        table.string("street").notNull()
        table.integer("n_house").notNull()
        table.string("neighborhood").notNull()
        table.string("zip_code").notNull()
        table.string("city").notNull()
        table.string("uf", 2).notNull()
        table.string("complement"),
        table.boolean("active")
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("adresses");
};
