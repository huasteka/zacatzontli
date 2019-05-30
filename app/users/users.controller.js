const userService = require("./users.service");
const responseFormatter = require("../response.formatter");

class UserController {
  findByTokenAction(req, res) {
    req.user.password = null;
    res.send(req.user);
  }

  findByIdAction(req, res) {
    userService.findById(req.params.userId)
      .then((user) => {
        user.password = null;
        res.json(user);
      })
      .catch(() => res.sendStatus(404));
  }

  updateUserAction(req, res) {
    const { name = null } = req.body;
    userService.updateUser(req.params.userId, name)
      .then((user) => res.json(user))
      .catch((err) => {
        res.status(err.status).json(responseFormatter.formatErrors(err));
      });
  }

  deleteUserAction(req, res) {
    userService.deleteUser(req.params.userId)
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(err.status).json(responseFormatter.formatErrors(err)));
  }

  changePaswordAction(req, res) {
    const { password = null, passwordConfirmation = null } = req.body;
    userService.changePassword(req.params.userId, password, passwordConfirmation)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(err.status).json(responseFormatter.formatErrors(err));
      });
  }
}

module.exports = new UserController();
