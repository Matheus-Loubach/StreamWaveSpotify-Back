const router = require("express").Router();
const ServiceController = require("../Controllers/userController");




//Users Register
router.route("/register").post((req, res) => ServiceController.register(req, res));

//User login
router.route("/login").post((req, res) => ServiceController.login(req, res));



module.exports = router;