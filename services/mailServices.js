const { transporter } = require('../utils/mailHandler');
const { generateOTP } = require('../utils/generateOtp');

const otpStore = {}; // { userid/email: { otp, expiresAt } }

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

async function sendVerificationMail(user) {
  const verificationOTP = generateOTP();
  otpStore[user._id] = {
    otp: verificationOTP,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
  };

  const verificationLink = `${FRONTEND_URL}/verify-otp?userid=${user._id}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Welcome to Code with Dipesh',
    html: `
      <p>Welcome to Code with Dipesh!</p>
      <p>Your account has been created with email: <b>${user.email}</b></p>
      <p>Please verify your email using the OTP: <b>${verificationOTP}</b> by clicking the link below:</p>
      <a href="${verificationLink}">Verify Email</a>
    `,
  };

  await transporter.sendMail(mailOptions);
  return verificationOTP;
}

function verifyEmailOtp(userid, otp) {
  const record = otpStore[userid];
  if (!record) return false;

  if (record.expiresAt < Date.now()) {
    delete otpStore[userid];
    return false;
  }

  if (record.otp == otp) {
    delete otpStore[userid];
    return true;
  }
  return false;
}

async function sendForgetPasswordLink(user, token) {
  const resetPasswordLink = `${FRONTEND_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Reset Password',
    html: `
      <p>Hi ${user.email},</p>
      <p>Please reset your password by clicking the link below:</p>
      <a href="${resetPasswordLink}">Reset Password</a>
      <p>This link expires in 1 hour.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
  return token;
}

module.exports = {
  sendVerificationMail,
  verifyEmailOtp,
  sendForgetPasswordLink,
};
