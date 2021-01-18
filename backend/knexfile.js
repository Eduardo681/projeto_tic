//producao
const {password} = require("./.env");
const fs = require("fs")
module.exports = {
  client: 'postgresql',
  connection: {
    host: 'severino-do-user-8236426-0.b.db.ondigitalocean.com',
    database: 'severino',
    user: 'doadmin',
    password: password,
    ssl: {
      ca: fs.readFileSync('./ca-certificate.crt'),
    },
    port: 25060
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
//dev
/* module.exports = {
  client: 'postgresql',
  connection: {
    database: 'severino',
    user: 'postgres',
    password: '01ehs681',
    port: 5432,
    host: 'localhost'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}; */

