const express = require('express');
const app = express();
const db = require('./config/database');
const consign = require('consign');
const cors = require('cors');
const MercadoPago = require("mercadopago");

MercadoPago.configure({
    sandbox: true,
    access_token: 'TEST-5614211510252516-102822-0c48a1fa3d8dd76537d4b1e69f746658-454070228'
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});
app.options('*', cors())

consign()
    .include("middlewares/passport.js")
    .then("api")
    .then("config/routes.js")
    .into(app)

app.use(express.static('public'))
app.db = db;

app.listen(80, () => {
    console.log('Server runing on port 80')
})

