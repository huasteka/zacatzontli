module.exports = function () {
  const defaultJwtSecret = ''
    .concat('89c6d2bb0ca4c2e41d990ba4650409fe881c797b172')
    .concat('db8712e5a3b8a0f3413ce3a1ce790f98e0aa88b8e45')
    .concat('83db6e12803f3a2b77908fb4a8e28c3e3316b125f0');
  return (process.env.JWT_SECRET_KEY || defaultJwtSecret);
};
