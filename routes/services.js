const router = require("express").Router();
const ServiceControllerUser = require("../Controllers/userController");




//Users Register
router.route("/register").post((req, res) => ServiceControllerUser.register(req, res));

//User login
router.route("/login").post((req, res) => ServiceControllerUser.login(req, res));



module.exports = router;