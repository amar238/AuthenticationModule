const queue = require('../middleware/bull');
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
  try {
    const { email }= req.body;
    const otp = generateOTP(email);  
    const OTP = {
      otp:otp,
      to:email
    }
    console.log(OTP)
    await queue.add(OTP);
    res.status(200).send('OTP sent successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Failed to send OTP');
  }  
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