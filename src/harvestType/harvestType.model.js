const Sequelize = require("sequelize");
const seq = require("../db/conn");
const Taxonomy = require("../taxonomy/taxonomy.model");

const HarvestType = seq.define("harvest_type", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    type:{
        type: Sequelize.STRING,
        allowNull: false
    },
}) 

module.exports = HarvestType