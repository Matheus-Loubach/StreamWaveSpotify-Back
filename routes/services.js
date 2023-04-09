const router = require("express").Router();
const ServiceController = require("../Controllers/userController");
const ServiceMusic = require("../Controllers/musicController");
const { getcurrentUser } = require("../Controllers/userController");

//token autenticação
const AuthGuard = require("../middleware/AuthGuard")


//Users Register
router.route("/register").post((req, res) => ServiceController.register(req, res));

//User login
router.route("/login").post((req, res) => ServiceController.login(req, res));

//UserOn
router.route("/profile").get(AuthGuard, getcurrentUser, (req, res) => ServiceController.getAll(req, res));


//Pegar as musicas recentes do usuario
router.route("/recent-tracks/:userId").get(AuthGuard,(req, res) => ServiceController.recentMusics(req, res));

//Pegar as musicas favoritas do usuario
router.route("/favorite/:userId").get(AuthGuard,(req, res) => ServiceController.favoriteMusicsGet(req, res));

//Enviar as musicas favorita do usuario
router.route("/favorite").post(AuthGuard,(req, res) => ServiceController.favoriteMusic(req, res));

//Deleta a musica favorita
router.route("/delete/:id").delete((req, res) => ServiceController.deleteMusicFavorite(req, res));

// Pesquisar músicas
router.route("/search").get((req, res) => ServiceMusic.BarraPesquisa(req, res));

// Adicionar músicas recentes para um usuário
router.route("/tracks/recent-tracks").post((req, res) => ServiceController.recentsMusicsUser(req, res));


module.exports = router;