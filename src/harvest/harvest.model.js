const Sequelize = require("sequelize");
const seq = require("../db/conn");

const Harvest = seq.define("harvest", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    quantity:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    harvestTypeId:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
});
 

module.exports = Harvest