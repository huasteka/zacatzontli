const passport = require("passport");

const authService = require("./auth.service");
authService.registerPassportStrategy(passport);
const responseFormatter = require("../response.formatter");

class AuthController {
  signUpAction(req, res) {
    authService.signUp(req.body)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((error) => {
        res.status(400).json(responseFormatter.formatErrors(error));
      });
  }

  signInAction(req, res) {
    authService.signIn(req.body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(() => {
        const error = responseFormatter.formatError(401, "unauthorized", "Credentials are incorrect");
        res.status(401).json(responseFormatter.formatErrors(error));
      });
  }
}

module.exports = new AuthController();
