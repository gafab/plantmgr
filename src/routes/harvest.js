const express = require("express");
const router = express.Router();
const harvestController = require("../harvest/harvest.controller");

router.get("/", harvestController.all);
router.get("/:id", harvestController.find);
router.get("/plant/:plantId", harvestController.findByPlantId);
router.post("/create", harvestController.create);
router.put("/update/:id", harvestController.update);
router.delete("/delete/:id", harvestController.del);

module.exports = router;