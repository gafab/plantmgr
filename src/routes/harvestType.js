const express = require("express");
const router = express.Router();
const harvestTypeController = require("../harvestType/harvestType.controller");

router.get("/", harvestTypeController.all);
router.get("/:id", harvestTypeController.find);
router.post("/create", harvestTypeController.create);
router.put("/update/:id", harvestTypeController.update);
router.delete("/delete/:id", harvestTypeController.del);

module.exports = router;