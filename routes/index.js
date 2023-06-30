const express = require("express");
const router = express.Router();
const todoRoutes = require("./todo");
const categoryRoutes = require("./category");

router.use("/todo", todoRoutes);
router.use("/category", categoryRoutes);

module.exports = router;
