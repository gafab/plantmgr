const Sequelize = require("sequelize");
const seq = require("../db/conn");

const Plant = seq.define("plant", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING,
        allowNull: true
    },
    taxonomyId:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
}) ;


module.exports = Plant;