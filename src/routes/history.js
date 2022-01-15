const express = require("express");
const router = express.Router();
const historyController = require("../history/history.controller");

router.get("/", historyController.all);
router.get("/:id", historyController.find);
router.get("/plant/:plantId", historyController.findByPlantId);
router.post("/create", historyController.create);
router.put("/update/:id", historyController.update);
router.delete("/delete/:id", historyController.del);

module.exports = router;