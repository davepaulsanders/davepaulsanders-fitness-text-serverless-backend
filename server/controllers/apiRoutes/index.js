const router = require("express").Router();
const clientRoutes = require("./clientRoutes");
const messageRoutes = require("./messageRoutes");
const userRoutes = require("./userRoutes");

// all routes for CRUD operations on collections
router.use("/clients", clientRoutes);
router.use("/messages", messageRoutes);
router.use("/users", userRoutes);

module.exports = router;
