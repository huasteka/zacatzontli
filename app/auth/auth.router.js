const expressRouter = require("express").Router;

const authController = require("./auth.controller");

/**
 * @apiDefine ErrorHandler
 * @apiError {Object[]} errors
 * @apiError {Number} errors.status
 * @apiError {String} errors.code
 * @apiError {String} errors.message
 */
const router = expressRouter();

/**
 * @api {post} /auth/sign-up Register user
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiName SignUp
 *
 * @apiParam {String} name
 * @apiParam {String} email
 * @apiParam {String} password
 *
 * @apiSuccess {String} token Generated JWT token
 *
 * @apiUse ErrorHandler
 */
router.post("/sign-up", authController.signUpAction);

/**
 * @api {post} /auth/sign-in Authenticate user
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiName SignIn
 *
 * @apiParam {String} email
 * @apiParam {String} password
 *
 * @apiSuccess {String} token Generated JWT token
 *
 * @apiUse ErrorHandler
 */
router.post("/sign-in", authController.signInAction);

module.exports = router;
