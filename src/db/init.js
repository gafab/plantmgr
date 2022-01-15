const Taxonomy = require("../taxonomy/taxonomy.model");
const Plant = require("../plant/plant.model");
const HarvestType = require("../harvestType/harvestType.model");
const Harvest = require("../harvest/harvest.model");
const History = require("../history/history.model");
const seq = require("./conn");

Taxonomy.hasOne(Plant); 
HarvestType.hasOne(Harvest); 
Plant.hasOne(History); 
Harvest.hasMany(History); 


seq.sync({ alter: true })
.then( res => console.log(res))
.catch(err => console.log(err))

