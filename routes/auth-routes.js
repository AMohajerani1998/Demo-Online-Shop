const express = require('express')
const router = express.Router();
const authController = require('../controllers/auth-controller')

router.get('/sign-up', authController.loadSignUpPage)

router.post('/sign-up', authController.signUpUser)

router.get('/log-in', authController.loadLoginPage)

router.post('/log-in', authController.loginUser)

router.post('/log-out', authController.logoutUser)

module.exports = router;