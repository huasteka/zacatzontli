const userService = require("./users.service");

class UserController {
  findByTokenAction(req, res) {
    req.user.password = undefined;
    res.send(req.user);
  }

  findByIdAction(req, res) {
    userService.findById(req.params.userId)
      .then((user) => {
        user.password = undefined;
        res.json(user);
      })
      .catch(() => res.sendStatus(404));
  }

  updateUserAction(req, res) {
    const { name = null } = req.body;
    userService.updateUser(req.params.userId, name)
      .then((user) => res.json(user))
      .catch((err) => {
        if (err && err.type === "name") {
          res.sendStatus(422);
        } else {
          res.sendStatus(404);
        }
      });
  }

  deleteUserAction(req, res) {
    userService.deleteUser(req.params.userId)
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(404));
  }

  changePaswordAction(req, res) {
    const { password = null, passwordConfirmation = null } = req.body;
    userService.changePassword(req.params.userId, password, passwordConfirmation)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        if (err && err.type === "password") {
          res.sendStatus(422);
        } else {
          res.sendStatus(404);
        }
      });
  }
}

module.exports = new UserController();
