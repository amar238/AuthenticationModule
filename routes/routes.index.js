const express = require('express');
const router = express.Router();
const authenticationController = require('../controller/authentication_controller')
const passport = require('passport');

router.use('/otp',require('./otp.routes'));
router.get('/sign-in',authenticationController.signInPage);
router.get('/sign-up',authenticationController.signUpPage);
router.get('/reset-password',authenticationController.resetPasswordPage);
router.get('/',passport.checkAuthentication,authenticationController.home);
router.get('/sign-out',authenticationController.destroySession);

router.post('/create-user',authenticationController.verifyRecaptcha,authenticationController.create);
router.post('/create-session',authenticationController.verifyRecaptcha,passport.authenticate('local', { failureRedirect: "/emp/sign-in" }),authenticationController.createSession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/sign-in'}),passport.checkAuthentication,authenticationController.home);

module.exports = router;
