const Harvest = require("./harvest.model");
const {
    Op
} = require("sequelize");
const Plant = require("../plant/plant.model");
const HarvestType = require("../harvestType/harvestType.model");

exports.all = async (req, res) => {
    try {
        const harvests = await Harvest.findAll();
        res.status(200).send(harvests);
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.find = async (req, res) => {
    try {
        const harvest = await Harvest.findOne({
            where: {
                id: req.params.id
            }
        });
        if (harvest) {
            res.status(200).send(harvest);
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
            const harvests = await Harvest.findAll({
                where: {
                    plantId: req.params.plantId
                }
            });
            res.status(200).send(harvests);
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
        const harvestTypeExists = await HarvestType.findOne({
            where: {
                id: req.body.harvestTypeId
            }
        });
        if (harvestTypeExists) {
            const harvest = await Harvest.create({
                harvestTypeId: req.body.harvestTypeId,
                quantity: req.body.quantity
            });
            res.status(201).send(harvest);
        } else {
            res.status(400).send({
                "message": "Harvest type not exists"
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.update = async (req, res) => {
    try {
        const harvestTypeExists = await HarvestType.findOne({
            where: {
                id: req.body.harvestTypeId
            }
        });
        if (harvestTypeExists) {
            const harvest = await Harvest.update({
                harvestTypeId: req.body.harvestTypeId,
                quantity: req.body.quantity
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.status(201).send(harvest);
        } else {
            res.status(400).send({
                "message": "Harvest type not exists"
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.del = async (req, res) => {
    try {
        const harvest = await Harvest.findOne({
            where: {
                id: req.params.id
            }
        });
        if (harvest) {
            await Harvest.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).send({
                message: "Deleted"
            });
        } else {
            res.status(404).send({
                message: "Harvest not found"
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
}