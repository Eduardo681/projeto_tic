
exports.up = function (knex) {
    return knex.schema.createTable("chat", table => {
        table.increments("id").primary().notNull()
        table.integer("id_provider").notNull().references("id").inTable("providers")
        table.integer("id_client").notNull().references("id").inTable("clients")
        table.string("message").notNull()
        table.boolean("message_received").notNull()
        table.string("date_send").notNull()
        table.date("date_received")
        table.string("midia")
        table.boolean("receptor")
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("chat");
};
