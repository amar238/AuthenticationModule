const validator = require('validator');
const bcrypt = require('bcrypt');
const User = require('../model/user');
const saltRounds = parseInt(process.env.saltRounds);
const axios = require('axios');

// render sign in page
module.exports.signInPage = (req,res)=>{

    res.render('sign_in')
}

// after sign in user
module.exports.createSession = (req,res)=>{
    return;
}

// render sign up page
module.exports.signUpPage = (req,res)=>{

    res.render('sign_up')
}

// create user
module.exports.create = async(req,res)=>{
    try {
        var {firstName, lastName, email, password, confirmPassword, recaptchaToken} = req.body;
        // Validate reCAPTCHA token
        const recaptchaSecretKey = process.env.recaptchaSecretKey
        const recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaToken}`);
        if (!recaptchaResponse.data.success || recaptchaResponse.data.score < 0.5) {
            return res.status(400).json({ success: false, error: 'reCAPTCHA validation failed' });
        }
        // validation
        if(!validator.isAlpha(firstName) || !validator.isAlpha(lastName)){
            return res.status(400).json({ success:false, error: 'First name and last name should only contain alphabets!'});
        }
        if (validator.isEmail(email)){
            if (password === confirmPassword){
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

// logout user
module.exports.destroySession = (req,res)=>{
    // req.logout(()=>{});
    res.redirect('/sign-in');
}

// reset password
module.exports.resetPasswordPage= (req,res)=>{
    res.render('reset_password');
}