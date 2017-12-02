const bcrypt = require('bcrypt');
const Promise = require('bluebird');

const User = require('./users.model');

class UserService {
  constructor(userSchema, bcrypt) {
    this.userSchema = userSchema;
    this.bcrypt = bcrypt;
  }

  createUser({name = null, email = null, password = null}) {
    return new Promise((resolve, reject) => {
      if (name && email && password) {
        const encryptedPassword = this.bcrypt.hashSync(password, 10);
        const q = (new User({name, email, password: encryptedPassword})).save();
        resolve(q);
      } else {
        reject({type: 'invalid'});
      }
    });
  }

  changePassword(userId, newPassword, newPasswordConfirmation) {
    return new Promise((resolve, reject) => {
      if (newPassword === newPasswordConfirmation) {
        const encryptedPassword = this.bcrypt.hashSync(newPassword, 10);
        this.findAndUpdate(userId, {password: encryptedPassword}, resolve, reject);
      } else {
        reject({type: 'password'});
      }
    });
  }

  updateUser(userId, name) {
    return new Promise((resolve, reject) => {
      if (name) {
        this.findAndUpdate(userId, {name: name}, resolve, reject);
      } else {
        reject({type: 'name'});
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

  findById(userId) {
    return this.userSchema.findById(userId);
  }

  findByEmail(email) {
    return this.userSchema.findOne({email: email});
  }

  findAndUpdate(userId, setter, resolve, reject) {
    this.userSchema.findOneAndUpdate({_id: userId}, {$set: setter}, {new: true}, (err, user) => {
      if (err) {
        reject({type: 'not_found'});
      } else {
        user.password = undefined;
        resolve(user);
      }
    });
  }

  isValidPassword(user, rawPassword) {
    return this.bcrypt.compareSync(rawPassword, user.password);
  }
}

module.exports = new UserService(User, bcrypt);
