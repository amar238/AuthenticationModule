const express = require('express');
const router = express.Router();
authenticationController = require('../controller/authentication_controller')

router.get('/sign-in',authenticationController.signInPage);
router.get('/sign-up',authenticationController.signUpPage);
router.get('/reset-password',authenticationController.resetPasswordPage);
router.post('/create-user',authenticationController.create);
module.exports = router;
