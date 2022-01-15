const express = require("express");
const router = express.Router();
const taxonomyController = require("../taxonomy/taxonomy.controller");

router.get("/", taxonomyController.all);
router.get("/:id", taxonomyController.find);
router.post("/create", taxonomyController.create);
router.put("/update/:id", taxonomyController.update);
router.delete("/delete/:id", taxonomyController.del);

module.exports = router;