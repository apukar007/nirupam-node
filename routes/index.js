const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const roleRoutes = require("./role");
const todoRoutes = require("./todo");
const categoryRoutes = require("./category");

router.use("/user", userRoutes);
router.use("/user-role", roleRoutes);
router.use("/todo", todoRoutes);
router.use("/category", categoryRoutes);

module.exports = router;
