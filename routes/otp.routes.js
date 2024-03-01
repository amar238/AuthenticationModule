const express = require('express');
const router = express.Router();
const otpController = require('../controller/otp_verifications_controller');

router.post('/send-otp-signup',otpController.SendSignUpOtp);
router.post('/verify-otp-signup',otpController.verifySignUpOtp);

module.exports = router;