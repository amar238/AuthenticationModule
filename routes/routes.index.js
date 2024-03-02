const express = require('express');
const router = express.Router();
const authenticationController = require('../controller/authentication_controller')
const passport = require('passport');

router.use('/otp',require('./otp.routes'));//use otp routes
router.get('/sign-in',authenticationController.signInPage);//render sign in page
router.get('/sign-up',authenticationController.signUpPage);//render sign up page
router.get('/reset-password',authenticationController.resetPasswordPage);//render reset password page
router.get('/',passport.checkAuthentication,authenticationController.home);//render home page
router.get('/sign-out',authenticationController.destroySession);//user log out
// post routes
router.post('/create-user',authenticationController.verifyRecaptcha,authenticationController.create);//create user
router.post('/create-session',authenticationController.verifyRecaptcha,passport.authenticate('local', { failureRedirect: "/emp/sign-in" }),authenticationController.createSession);//log in user using passport
router.post('/change-password',passport.checkAuthentication,authenticationController.changePassword);//reset password
// social authentication :- google routes
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/sign-in'}),passport.checkAuthentication,authenticationController.home);

module.exports = router;
