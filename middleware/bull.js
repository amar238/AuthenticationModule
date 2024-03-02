const Queue = require('bull');
const REDIS_URL = process.env.REDIS_URL;

const queue = new Queue('signUpOTPQueue', REDIS_URL);

module.exports = queue;

