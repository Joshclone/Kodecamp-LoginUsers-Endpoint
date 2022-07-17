const express = require("express");
const router = express.Router();

const userController = require("../controllers/loginController");


router.post("/login", userController.login);

module.exports = router;