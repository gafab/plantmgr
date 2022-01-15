const Taxonomy = require("./taxonomy.model");
const { Op } = require("sequelize");

exports.all = async (req, res) => {
    try {
        const taxs = await Taxonomy.findAll();
        res.status(200).send(taxs);
    } catch (err) {
        res.status(500).send(err)
    }
}
 
exports.find = async (req, res) => {
    try {
        const tax = await Taxonomy.findOne({where:{id: req.params.id}});
        if(tax){
            res.status(200).send(tax);
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
        const taxExists = await Taxonomy.findOne(
            {
                where:{
                    genus:req.body.genus,
                    species:req.body.species,
                }
            });
        if(taxExists){
            res.status(412).send({"message":"Taxonomy with both genus and species already exists"});
        }else{
            const tax = await Taxonomy.create(
                {
                    genus:req.body.genus,
                    species:req.body.species,
                    commonName:req.body.commonName,
                    commonNameAlt:req.body.commonNameAlt
                }
            );
            res.status(201).send(tax);
        }
    } catch (err) {
        res.status(500).send(err)
    }
}
 
exports.update = async (req, res) => {
    try {
        const taxExists = await Taxonomy.findOne({where:{id: req.params.id}})
        if(taxExists){
            const ixGenusSpeciesExists = await Taxonomy.findOne(
                {
                    where:{
                        id: {
                            [Op.ne]:req.params.id
                        },
                        genus:req.body.genus,
                        species:req.body.species
                        
                    }
                });
            if(ixGenusSpeciesExists){
                res.status(412).send({"message":"Another taxonomy with both genus and species already exists"});
            }else{
                const tax = await Taxonomy.update(  
                    {
                        genus: req.body.genus,
                        species: req.body.species,
                        commonName: req.body.commonName,
                        commonNameAlt: req.body.commonNameAlt,
                       
                    },
                    {
                        where:{
                            id:req.params.id
                        }
                    }
                );
                res.status(200).send({message:"Updated"});
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
        await Taxonomy.destroy({where:{id: req.params.id}});
        res.status(200).send({message:"Deleted"});
    } catch (err) {
        res.status(500).send(err);
    }
}