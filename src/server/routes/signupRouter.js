const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');

router.use('/', signupController.createUser, (req, res) =>
  res.status(200).json(res.locals.data)
);

module.exports = router;
