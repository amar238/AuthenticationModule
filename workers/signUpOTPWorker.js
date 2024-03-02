const queue = require('../middleware/bull');
const signUpOTPMailer = require('../mailers/sign_up_otp_mailer');

queue.process('signUpOTPQueue',async(job,done)=>{
    await signUpOTPMailer.emailSignUpOTP(job.data);
    done();
    }
)

