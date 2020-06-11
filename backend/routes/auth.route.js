const express = require('express');

/** Controllers */
const { login } = require('../controllers/auth.controller');

const { loginValidation } = require('../validations/login.validation');
const router = express.Router();

router.post('/login', loginValidation(), login);

module.exports = router;
