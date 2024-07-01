const {Pool} = require("pg")

const pool = new Pool({
    user:"postgres",
    password:"35756srlll",
    host:"localhost",
    port:5432,
    database:"Car_storage"
})

module.exports = pool;