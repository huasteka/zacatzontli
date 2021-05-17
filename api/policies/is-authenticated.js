const passport = require('passport');

module.exports = async function (req, res, next) {
  passport.authenticate('jwt', { session: false })(req, res, next);
};
