const path = require('path');
const passport = require('passport');
const passportJWT = require('passport-jwt');

const getSecretJWT = require(path.resolve(__dirname, '../', 'jwt'));

const ExtractJWT = passportJWT.ExtractJwt;
const StrategyJWT = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: getSecretJWT(),
};

const strategy = new StrategyJWT(jwtOptions, (async (payload, next) => {
  const user = await User.findOne({ id: payload.user_id }).then();

  if (!user) {
    const err = {
      status: 401,
      code: 'unauthorized',
      message: 'Unauthorized',
    };
    return next(err, false);
  }

  next(null, user);
}));

passport.use(strategy);
