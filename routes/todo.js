const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todo");

router.get("/", todoController.getAll);
router.get("/:id", todoController.getTodo);

router.post("/", todoController.create);

router.put("/", todoController.update);

router.delete("/", todoController.delete);

module.exports = router;
