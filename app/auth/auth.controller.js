const passport = require("passport");

const authService = require("./auth.service");
authService.registerPassportStrategy(passport);

class AuthController {
  signUpAction(req, res) {
    authService.signUp(req.body)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch(() => {
        res.sendStatus(401);
      });
  }

  signInAction(req, res) {
    authService.signIn(req.body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(() => {
        res.sendStatus(401);
      });
  }
}

module.exports = new AuthController();
