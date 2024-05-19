const express = require('express')
const router = express.Router();
const userControllers = require('../controllers/user-controllers')

router.get('/sign-up', userControllers.loadSignUpPage)

router.post('/sign-up', userControllers.signUpUser)

router.get('/log-in', userControllers.loadLoginPage)

router.post('/log-in', userControllers.loginUser)

router.post('/log-out', userControllers.logoutUser)

module.exports = router;