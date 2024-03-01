const nodemailer = require('../middleware/nodemailer');

const otps = new Map();
function generateOTP(email) {
    const otp = Math.floor(100000 + Math.random() * 900000);; // Function to generate a random OTP
    const otpValidityDuration = 5 * 60 * 1000;
    otps.set(email,otp );
    setTimeout(() => {
        otps.delete(email); 
    }, otpValidityDuration);
    return otp;
}

module.exports.SendSignUpOtp = async(req,res)=>{
    const { email }= req.body;
    const otp = generateOTP(email);
    console.log(otps)
    const server_email = process.env.server_email;
    let htmlString = nodemailer.renderTemplate({otp:otp},'/email_templates/signup_otp.ejs');
    const mailOptions = {
        from: server_email,
        to: email,
        subject: 'Verification OTP',
        html: htmlString
    };

   nodemailer.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).send('Failed to send OTP');
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).send('OTP sent successfully');
        }
    });
}

module.exports.verifySignUpOtp=(req,res)=>{
    var { email, otp } = req.body;
    // otp = parseInt(otp)
    if (otps.has(email) && otps.get(email) == otp) {
      res.status(200).send('OTP verified successfully');
      otps.delete(email);
    } else {
      res.status(400).send('Invalid OTP');
    }
}