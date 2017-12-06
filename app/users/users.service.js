const bcrypt = require("bcrypt");
const Promise = require("bluebird");

const User = require("./users.model");
const config = require("../config");

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
        reject({type: "invalid"});
      }
    });
  }

  updateUser(userId, name) {
    return new Promise((resolve, reject) => {
      if (name) {
        this.findAndUpdate(userId, {name}, resolve, reject);
      } else {
        reject({type: "name"});
      }
    });
  }

  deleteUser(userId) {
    return new Promise((resolve, reject) => {
      User.remove({_id: userId}, (err) => {
        err ? reject(err) : resolve();
      });
    });
  }

  changePassword(userId, newPassword, newPasswordConfirmation) {
    return new Promise((resolve, reject) => {
      if (newPassword === newPasswordConfirmation) {
        this.findAndUpdate(userId, {password: this.hashPassword(newPassword)}, resolve, reject);
      } else {
        reject({type: "password"});
      }
    });
  }

  findById(userId) {
    return this.userSchema.findById(userId);
  }

  findByEmail(email) {
    return this.userSchema.findOne({email});
  }

  findAndUpdate(userId, setter, resolve, reject) {
    this.userSchema.findOneAndUpdate({_id: userId}, {$set: setter}, {new: true}, (err, user) => {
      if (err) {
        reject({type: "not_found"});
      } else {
        user.password = undefined;
        resolve(user);
      }
    });
  }

  hashPassword(password) {
    return this.bcrypt.hashSync(password, this.bcryptSalt);
  }

  isValidPassword(user, rawPassword) {
    return this.bcrypt.compareSync(rawPassword, user.password);
  }
}

module.exports = new UserService(User, bcrypt);
