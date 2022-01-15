const Sequelize = require("sequelize");

const seq = new Sequelize("plantmgr", process.env.DB_USER, process.env.DB_PWD,{
    dialect: "mysql",
    host: "localhost"
})

module.exports = seq;