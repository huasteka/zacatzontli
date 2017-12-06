const expressRouter = require("express").Router;
const passport = require("passport");

const userController = require("./users.controller");

const router = expressRouter();
router.use(passport.authenticate("jwt", {session: false}));
router.get("/:userId", userController.findByIdAction);
router.put("/:userId", userController.updateUserAction);
router.delete("/:userId", userController.deleteUserAction);
router.post("/:userId/change-password", userController.changePaswordAction);

module.exports = router;
