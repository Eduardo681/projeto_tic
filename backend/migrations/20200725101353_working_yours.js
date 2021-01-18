
exports.up = function(knex) {
    return knex.schema.createTable("working_yours", table => {
        table.increments("id").primary().notNull()
        table.integer("id_provider").notNull().references("id").inTable("providers").notNullable().unsigned().onDelete('CASCADE')
        table.string("day_of_week")
        table.time("start_time")
        table.time("final_hour") 
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("working_yours");
};
