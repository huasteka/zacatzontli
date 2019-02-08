const bcrypt = require("bcrypt");
const Promise = require("bluebird");

const User = require("./users.model");
const config = require("../config");
const responseFormatter = require("../response.formatter");

class UserService {
  constructor(userSchema, bcrypt) {
    this.userSchema = userSchema;
    this.bcrypt = bcrypt;
    this.bcryptSalt = config.passwordSalt;
  }

  createUser({name = null, email = null, password = null}) {
    return new Promise((resolve, reject) => {
      if (name && email && password) {
        const q = (new User({name, email, password: this.hashPassword(password)})).save();
        resolve(q);
      } else {
        reject(responseFormatter.formatError(400, "invalid_user", "Invalid user data"));
      }
    });
  }

  updateUser(userId, name) {
    return new Promise((resolve, reject) => {
      if (name) {
        this.findAndUpdate(userId, {name}, resolve, reject);
      } else {
        reject(responseFormatter.formatError(400, "invalid_user_name", "Invalid user name"));
      }
    });
  }

  deleteUser(userId) {
    return new Promise((resolve, reject) => {
      User.remove({_id: userId}, (err) => {
        const error = responseFormatter.formatError(400, "invalid_user_id", "Invalid user ID");
        err ? reject(error) : resolve();
      });
    });
  }

  changePassword(userId, newPassword, newPasswordConfirmation) {
    return new Promise((resolve, reject) => {
      if (newPassword === newPasswordConfirmation) {
        this.findAndUpdate(userId, {password: this.hashPassword(newPassword)}, resolve, reject);
      } else {
        reject(responseFormatter.formatError(400, "invalid_user_password", "Invalid user password"));
      }
    });
  }

  findById(userId) {
    return new Promise((resolve, reject) => {
      this.userSchema
        .findById(userId)
        .then(resolve)
        .catch(function () {
          const err = responseFormatter.formatError(400, "user_not_found", "User was not found");
          reject(err);
        });
    });
  }

  findByEmail(email) {
    return this.userSchema.findOne({email});
  }

  findAndUpdate(userId, setter, resolve, reject) {
    this.userSchema.findOneAndUpdate({_id: userId}, {$set: setter}, {new: true}, (err, user) => {
      if (err) {
        reject(responseFormatter.formatError(400, "user_not_exists", "User does not exists"));
      } else {
        user.password = undefined;
        resolve(user);
      }
    });
  }

  hashPassword(password) {
    const salt = this.bcrypt.genSaltSync(this.bcryptSalt);
    return this.bcrypt.hashSync(password, salt);
  }

  isValidPassword(user, rawPassword) {
    return this.bcrypt.compareSync(rawPassword, user.password);
  }
}

module.exports = new UserService(User, bcrypt);
