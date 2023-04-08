const router = require("express").Router();
const ServiceControllerUser = require("../Controllers/userController");




//Users Register
router.route("/users/register").post((req, res) => ServiceControllerUser.register(req, res));

//User login
router.route("/users/login").post((req, res) => ServiceControllerUser.login(req, res));



module.exports = router;