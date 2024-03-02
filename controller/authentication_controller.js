const validator = require('validator');
const bcrypt = require('bcrypt');
const User = require('../model/user');
const saltRounds = parseInt(process.env.saltRounds);
const axios = require('axios');

// render home page
module.exports.home = (req,res)=>{
    res.render('home');
}

// render sign in page
module.exports.signInPage = (req,res)=>{
    res.render('sign_in')
}

// render sign up page
module.exports.signUpPage = (req,res)=>{
    res.render('sign_up')
}

// after sign in user
module.exports.createSession = async(req,res,next)=>{
    return res.status(200).json({ success:true, message:'User created successfully!'});
}

// create user
module.exports.create = async(req,res)=>{
    try {
        var {firstName, lastName, email, password, confirmPassword} = req.body;
        // validate name and email
        if(!validator.isAlpha(firstName) || !validator.isAlpha(lastName)){
            return res.status(400).json({ success:false, error: 'First name and last name should only contain alphabets!'});
        }
        if (validator.isEmail(email)){
            // validate matched passwords
            if (password === confirmPassword){
                // encrypt password
                const salt = await bcrypt.genSalt(saltRounds);
                hashedPassword = await bcrypt.hash(password,salt);  
                await User.create({
                    firstName:firstName,
                    lastName:lastName,
                    email:email,
                    password:hashedPassword
                });
            }else{
                return res.status(400).json({ success:false, error: 'Password and confirmed password does not match!'});
            }
            return res.status(200).json({ success:true, message:'User created successfully!'});
        }else{
            return res.status(400).json({ success:false, error: 'Invalid Email!'});
        }
    }
    catch (error) {
        return res.status(400).json({ success:false, error: 'User already exist with this email'});
    }
}

// function to validate Recaptcha
module.exports.verifyRecaptcha = async(req,res,next)=>{
    try {
        const recaptchaToken = req.body.recaptchaToken;
        const recaptchaSecretKey = process.env.recaptchaSecretKey;
        const recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaToken}`);
        if (!recaptchaResponse.data.success || recaptchaResponse.data.score < 0.5) {
            return res.status(400).json({ success: false, error: 'reCAPTCHA validation failed' });
        }
        return next();
    } catch (error) {
        console.log(error);
    }
}

// logout user
module.exports.destroySession = (req,res)=>{
    req.logout(()=>{});
    res.redirect('/sign-in');
}

// render reset password page
module.exports.resetPasswordPage= (req,res)=>{
    res.render('reset_password');
}

// change password
module.exports.changePassword=async(req,res)=>{
    try {
        // encrypt password
        const salt = await bcrypt.genSalt(saltRounds);
        hashedPassword = await bcrypt.hash(req.body.password,salt); 
        await User.updateOne({email:req.user.email},{password:hashedPassword});
        return res.status(200).json({ success:true, message:'User created successfully!'});
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, error: 'Error in resetting password' });
    }
}