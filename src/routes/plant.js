const express = require("express");
const router = express.Router();
const  plantController = require("../plant/plant.controller");

router.get("/",  plantController.all);
router.get("/:id",  plantController.find);
router.post("/create",  plantController.create);
router.put("/update/:id",  plantController.update);
router.delete("/delete/:id",  plantController.del);

module.exports = router;