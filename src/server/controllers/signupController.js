const express = require('express');
const UserModel = require('../models/userModel');

const signupController = {};

signupController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  UserModel.create({ username, password })
    .then(response => {
      res.locals.data = response;
      return next();
    })
    .catch(err =>
      next({
        log: 'ERROR in signupController.createUser',
        msg: { err: 'ERROR in signupController.createUser' },
      })
    );
};

module.exports = signupController;
