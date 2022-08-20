const express = require('express');
const UserModel = require('../models/userModel');

const loginController = {};

loginController.loginUser = (req, res, next) => {
  const { username, password } = req.body;
  UserModel.findOne({ username, password })
    .then(response => {
      res.locals.response = response === null ? false : true;
      console.log('AUTH?', res.locals.response);
      return next();
    })
    .catch(err =>
      next({
        log: 'ERROR in loginController.loginUser',
        msg: { err: 'ERROR in loginController.loginUser' },
      })
    );
};

module.exports = loginController;
