
exports.up = function (knex) {
    return knex.schema.createTable("products", table => {
        table.increments("id").primary().notNull()
        table.string("description").unique()
        table.integer("status")
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("products");
};
