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
module.exports.create = (req,res)=>{
    return;
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