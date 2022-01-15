const History = require("./history.model");
const {
    Op
} = require("sequelize");
const Harvest = require("../harvest/harvest.model");
const Plant = require("../plant/plant.model");

exports.all = async (req, res) => {
    try {
        const histories = await History.findAll();
        res.status(200).send(histories);
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.find = async (req, res) => {
    try {
        const history = await History.findOne({
            where: {
                id: req.params.id
            }
        });
        if (history) {
            res.status(200).send(history);
        } else {
            res.status(404).json({
                message: "Not found"
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.findByPlantId = async (req, res) => {
    try {
        const plant = await Plant.findOne({
            where: {
                id: req.params.plantId
            }
        });
        if (plant) {
            const histories = await History.findAll({
                where: {
                    plantId: req.params.plantId
                }
            });
            res.status(200).send(histories);
        } else {
            res.status(404).json({
                message: "Not found"
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}


exports.create = async (req, res) => {
    try {
        const plantExists = await Plant.findOne({
            where: {
                id: req.body.plantId
            }
        });
        if (plantExists) {
            let harvest = req.body.harvestId;
            let harvestExists = false;
            if (harvest) {
                harvestExists = await Harvest.findOne({
                    where: {
                        id: req.body.harvestId
                    }
                });
            }
            if (!harvest || (harvest && harvestExists)) {
                const history = await History.create({
                    date: req.body.date,
                    description: req.body.description,
                    plantId: req.body.plantId,
                    harvestId: req.body.harvestId,
                });
                res.status(201).send(history);
            } else {
                res.status(400).send({
                    "message": "Harvest not exists"
                });
            }
        } else {
            res.status(400).send({
                "message": "Plant not exists"
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.update = async (req, res) => {
    try {

        const history = await History.findOne({
            where: {
                id: req.params.id
            }
        });
        const harvestExists = await Harvest.findOne({
            where: {
                id: req.body.harvestId
            }
        });
        if(!harvestExists){
            req.body.harvestId = null;
        }
        req.body.plantId = history.plantId;
        if(history){
            await History.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            res.status(201).send({message:"Updated"});
        }else{
            res.status(404).send({
                "message": "History not found"
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.del = async (req, res) => {
    try {
        const history = await History.findOne({
            where: {
                id: req.params.id
            }
        });
        if (history) {
            await History.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).send({
                message: "Deleted"
            });
        } else {
            res.status(404).send({
                message: " History not found"
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
}