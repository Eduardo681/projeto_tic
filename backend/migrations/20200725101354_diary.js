
exports.up = function (knex) {
    return knex.schema.createTable("diary", table => {
        table.increments("id").primary().notNull()
        table.integer("id_working_your").notNull().references("id").inTable("working_yours")
        table.integer("id_adresse").notNull().references("id").inTable("adresses")
        table.date("date").notNull()
        table.time("hour").notNull()
        table.string("contact", 50)
        table.string("description").notNull()
        table.boolean("user_notified").notNull()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("diary");
};
