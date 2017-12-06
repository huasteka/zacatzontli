const expressRouter = require("express").Router;

const authController = require("./auth.controller");

const router = expressRouter();
router.post("/sign-up", authController.signUpAction);
router.post("/sign-in", authController.signInAction);

module.exports = router;
