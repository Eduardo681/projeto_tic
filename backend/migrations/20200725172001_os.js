
exports.up = function (knex) {
    return knex.schema.createTable("os", table => {
        table.increments("id").primary().notNull()
        table.integer("id_diary").notNull().references("id").inTable("diary")
        table.enu("status_os", ["pendent", "finished", "awaiting_payment", "canceled"], { useNative: true, enumName: 'status_os'}).notNull()
        table.string("maintenance_description")
        table.date("open_date").notNull()
        table.float("value_manpower")
        table.float("value_total")
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("os");
};
