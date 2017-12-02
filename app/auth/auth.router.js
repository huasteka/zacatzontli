const express = require('express');
const passport = require('passport');

const router = express.Router();

const authService = require('./auth.service');

authService.registerPassportStrategy(passport);

router.post('/sign-up', (req, res) => {
  authService.signUp(req.body)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch(() => {
      res.sendStatus(401);
    });
});

router.post('/sign-in', (req, res) => {
  authService.signIn(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.sendStatus(401);
    });
});

module.exports = router;
