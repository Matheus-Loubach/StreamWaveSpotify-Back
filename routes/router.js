const router = require("express").Router();

const serviceRouter = require("./services.js");

router.use("/", serviceRouter)


module.exports = router;