const express = require("express");
const {authguard, admin} = require("../middlewares/authguard");
const router = express.Router();

const todoController = require("../controllers/todo");

// create a middleware to check if user is admin


router.get("/",[ authguard, admin ], todoController.getAll);
router.get("/:id", todoController.getTodo);

router.post("/", todoController.create);

router.put("/", todoController.update);

router.delete("/", todoController.delete);

module.exports = router;
