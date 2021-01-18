exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
      table.increments("id").primary()
      table.string("login",255).notNull().unique()
      table.string("password").notNull()
      table.enu("type_user",["administrator", "service provider", "client", "provider_company", "client_company"], { useNative: true, enumName: 'type_user' }).notNull()
      table.dateTime("create_at").notNull()
      table.date("birth")
      table.string("username", 50).notNull()
      table.string("cpf_cnpj", 20).notNull()
      table.string("rg", 20).notNull()
      table.string("street").notNull()
      table.integer("n_house").notNull()
      table.string("neighborhood").notNull()
      table.string("zip_code").notNull()
      table.string("city").notNull()
      table.string("uf", 2).notNull()
      table.string("complement")
      table.string("picture")
      table.boolean("company").notNull()
      table.boolean("status_login")
      table.enu("status_active", ["active", "inactive", "blocked", "waiting"], { useNative: true, enumName: 'status_active'}),
      table.boolean("checked").notNull()
      table.string("sex", 1),
      table.enu("marital_status", ["married", "divorced", "single","widower"], {useNative: true, enumName: 'marital_status'})
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("users")
};
