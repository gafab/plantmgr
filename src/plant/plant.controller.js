const Plant = require("./plant.model");
const { Op } = require("sequelize");
const Taxonomy = require("../taxonomy/taxonomy.model");

exports.all = async (req, res) => {
    try {
        const plants = await Plant.findAll();
        res.status(200).send(plants);
    } catch (err) {
        res.status(500).send(err)
    }
}
 
exports.find = async (req, res) => {
    try {
        const plant = await Plant.findOne({where:{id: req.params.id}});
        if(plant){
            res.status(200).send(plant);
        }else{
            res.status(404).json({message:"Not found"});
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
 
exports.create = async (req, res) => {
    try {
        const taxExists = await Taxonomy.findOne({where:{id: req.body.taxonomyId}});
        if(taxExists){
            const plant = await Plant.create(
                {
                    taxonomyId:req.body.taxonomyId,
                    description:req.body.description
                }
            );
            res.status(201).send(plant);
        }else{
            res.status(400).send({"message":"Taxonomy not exists"});
        }
    } catch (err) {
        res.status(500).send(err)
    }
}
 
exports.update = async (req, res) => {
    try {
        const plant = await Plant.findOne({where:{id: req.params.id}});
        if(plant){
            const taxExists = await Taxonomy.findOne({where:{id: req.body.taxonomyId}});
            if(taxExists){
                const plant = await Plant.update(  
                    {
                        taxonomyId:req.body.taxonomyId,
                        description: req.body.description,
                    },
                    {
                        where:{
                            id:req.params.id
                        }
                    }
                );
                res.status(200).send({message:"Updated"});
            }else{
                res.status(400).send({"message":"Taxonomy not exists"});
            }
        }else{
            res.status(404).json({message:"Not found"});
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
 
exports.del = async (req, res) => {
    try {
        const plant = await Plant.findOne({where:{id: req.params.id}});
        if(plant){
            await Plant.destroy({where:{id: req.params.id}});
            res.status(200).send({message:"Deleted"});
        }else{
            res.status(404).send({message:"Plant not found"});
        }
    } catch (err) {
        res.status(500).send(err);
    }
}