const {
    Op
} = require("sequelize");
const Plant = require("../plant/plant.model");
const HarvestType = require("./harvestType.model");

exports.all = async (req, res) => {
    try {
        const harvests = await HarvestType.findAll();
        res.status(200).send(harvests);
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.find = async (req, res) => {
    try {
        const harvest = await HarvestType.findOne({
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

exports.create = async (req, res) => {
    try {
        const harvest = await HarvestType.create({
            type: req.body.type
        });
        res.status(201).send(harvest);
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.update = async (req, res) => {
    try {
        const harvest = await HarvestType.update({
            type: req.body.type
        },
        {where:{id:req.body.id}});
        res.status(201).send(harvest);
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.del = async (req, res) => {
    try {
        const harvest = await HarvestType.findOne({
            where: {
                id: req.params.id
            }
        });
        if (harvest) {
            await HarvestType.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).send({
                message: "Deleted"
            });
        } else {
            res.status(404).send({
                message: "Harvest type not found"
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
}