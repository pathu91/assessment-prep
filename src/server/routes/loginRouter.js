const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const path = require('path');

router.post('/', loginController.loginUser, (req, res) => {
  // if (res.locals.response) {
  // res.status(200).sendFile(path.resolve(__dirname, '../../client/index.html'));
  console.log('WE ARE INSIDE ABOUT TO REDIRECT');
  res.redirect('/homepage');
  // } else {
  //   res.status(400).send('No user found');
  // }
});

module.exports = router;
