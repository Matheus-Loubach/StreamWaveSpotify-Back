const router = require("express").Router();
const ServiceController = require("../Controllers/userController");
const { getcurrentUser } = require("../Controllers/userController");

//token autenticação
const AuthGuard = require("../middleware/AuthGuard")


//Users Register
router.route("/register").post((req, res) => ServiceController.register(req, res));

//User login
router.route("/login").post((req, res) => ServiceController.login(req, res));

//UserOn
router.route("/profile").get(AuthGuard, getcurrentUser, (req, res) => ServiceController.getAll(req, res));

module.exports = router;