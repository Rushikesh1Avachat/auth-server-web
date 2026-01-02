const twilio = require('twilio');
const { generateOTP } = require('../utils/generateOtp');

const client = new twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendOTPVerification(phone) {
  const otp = generateOTP();

  await client.messages.create({
    body: `Your OTP is ${otp}`,
    from: process.env.TWILIO_PHONE,
    to: phone,
  });

  return otp;
}

module.exports = {
  sendOTPVerification,
};
