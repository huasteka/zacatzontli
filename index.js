const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const passport = require('passport');
const cors = require('cors');

const config = require('./app/config');
const authRouter = require('./app/auth/auth.router');
const usersRouter = require('./app/users/users.router');

mongoose.connect(config.mongoConnectionURL, {useMongoClient: true});
mongoose.Promise = bluebird;

const app = express();
app.use(passport.initialize());
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.write('Alive and kicking!');
  res.end();
});
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.info('Listening server at port ' + port);
});
