const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');

const ExtractJwt = passportJWT.ExtractJwt;
const StrategyJwt = passportJWT.Strategy;

const config = require('../config');
const userService = require('../users/users.service');

class AuthService {
  constructor(jwt, userService, config) {
    this.userService = userService;
    this.jwt = jwt;
    this.jwtOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtSecretKey
    };
  }

  registerPassportStrategy(passport) {
    const strategy = new StrategyJwt(this.jwtOptions, (jwtPayload, next) => {
      this.userService.findById(jwtPayload.user_id)
        .then((user) => next(null, user))
        .catch((err) => next(err, false));
    });
    passport.use(strategy);
  }

  signUp(signUpRequest) {
    return this.userService.createUser(signUpRequest)
      .then((user) => {
        return new Promise((resolve, reject) => {
          if (this.userService.isValidPassword(user, password)) {
            resolve(this.createAuthToken(user));
          } else {
            reject();
          }
        });
      });
  }

  signIn({email, password}) {
    return this.userService.findByEmail(email)
      .then((user) => {
        return this.createAuthToken(user);
      });
  }

  createAuthToken(user) {
    const token = this.jwt.sign({user_id: user.id}, this.jwtOptions.secretOrKey, {expiresIn: '12h'});
    return {token: token};
  }
}

module.exports = new AuthService(jwt, userService, config);
