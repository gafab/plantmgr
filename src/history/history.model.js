const Sequelize = require("sequelize");
const seq = require("../db/conn");

const History = seq.define("history", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    date:{
        type: Sequelize.DATE,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING,
        allowNull: true
    },
    plantId:{
        type: Sequelize.INTEGER,
        allowNull: false
    },    
    harvestId:{
        type: Sequelize.INTEGER,
        allowNull: true
    },    
});

module.exports = History;