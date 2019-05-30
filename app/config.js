// PORT environment variable is automatically set by Heroku
const config = {
  serverPort: process.env.PORT || 9704,
  mongoConnectionURL: process.env.MONGO_CONNECTION_URL || "mongodb://localhost:27017/zacatzontli",
  jwtSecretKey: process.env.JWT_SECRET_KEY || "89c6d2bb0ca4c2e41d990ba4650409fe881c797b172db8712e5a3b8a0f3413ce3a1ce790f98e0aa88b8e4583db6e12803f3a2b77908fb4a8e28c3e3316b125f0",
  passwordSalt: process.env.BCRYPT_PASSWORD_SALT || 12
};
module.exports = config;
