const express = require('express');
const loginController = require('../controllers/loginController');
const logoutController = require('../controllers/logoutController');
const refreshController = require('../controllers/refreshController');
const registerController = require('../controllers/registerController');
const router = express.Router()

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/refresh", refreshController);
router.get("/logout", logoutController);

module.exports = router;