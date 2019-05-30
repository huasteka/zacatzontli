const expressRouter = require("express").Router;
const passport = require("passport");

const userController = require("./users.controller");

const router = expressRouter();
router.use(passport.authenticate("jwt", { session: false }));

/**
 * @api {get} /users/profile Fetch user profile
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiName FetchUserProfile
 * @apiHeader {String} Authorization Generated JWT token
 */
router.get("/profile", userController.findByTokenAction);

/**
 * @api {get} /users/:userId Fetch user
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiName FetchUser
 * @apiHeader {String} Authorization Generated JWT token
 */
router.get("/:userId", userController.findByIdAction);

/**
 * @api {put} /users/:userId Update account
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiName UpdateUser
 * @apiHeader {String} Authorization Generated JWT token
 */
router.put("/:userId", userController.updateUserAction);

/**
 * @api {delete} /users/:userId Delete user
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiName DeleteUser
 * @apiHeader {String} Authorization Generated JWT token
 */
router.delete("/:userId", userController.deleteUserAction);

/**
 * @api {post} /users/:userId/change-password Change user password
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiName UpdateUserPassword
 * @apiHeader {String} Authorization Generated JWT token
 */
router.post("/:userId/change-password", userController.changePaswordAction);

module.exports = router;
