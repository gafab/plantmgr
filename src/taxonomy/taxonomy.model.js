const Sequelize = require("sequelize");
const seq = require("../db/conn");
const HarvestType = require("../harvestType/harvestType.model");
const Plant = require("../plant/plant.model");

const Taxonomy = seq.define("taxonomy", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    genus:{
        type: Sequelize.STRING,
        allowNull: false
    },
    species:{
        type: Sequelize.STRING,
        allowNull: false
    },
    commonName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    commonNameAlt:{
        type: Sequelize.STRING,
        allowNull: true
    }
},
{indexes:[
    {
        unique: true,
        fields: ['genus','species']
    },
]}) 


module.exports = Taxonomy