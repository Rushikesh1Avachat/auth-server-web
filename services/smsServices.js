const twilio = require('twilio');
const { generateOTP } = require('../utils/generateOtp');

const client = new twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendOTPVerification(phone) {
  // 1. Remove all non-numeric characters (spaces, dashes, etc.)
  let cleanNumber = phone.replace(/\D/g, '');

  // 2. Format to E.164 (Assuming India +91)
  let formattedPhone;
  if (cleanNumber.length === 10) {
    formattedPhone = `+91${cleanNumber}`;
  } else if (cleanNumber.startsWith('91') && cleanNumber.length === 12) {
    formattedPhone = `+${cleanNumber}`;
  } else {
    // If it already has a '+' just use it as is
    formattedPhone = phone.startsWith('+') ? phone : `+${cleanNumber}`;
  }

  let verificationOTP = await generateOTP();

  // 3. Send via Twilio
  await client.messages.create({
    body: `Your verification code is ${verificationOTP}`,
    from: process.env.TWILIO_PHONE,
    to: formattedPhone, // Now this will be +919561686658
  });

  return verificationOTP;
}

module.exports = {
  sendOTPVerification,
};
