const { transporter } = require('../utils/mailHandler');
const { generateOTP } = require('../utils/generateOtp');
const { generateTokens } = require('../utils/authHandler');

async function sendVerificationMail(user) {
  let verificationOTP = await generateOTP();
  // Send verification mail
  const varificationLink = `http://localhost:5173/verify-otp?userid=${user?._id}`;
  // verificatio email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user?.email,
    subject: 'Welcome to Code with Dipesh',
    html: `<p>welcome to code with dipesh, your account has been created with email: ${user?.email}<p><b>please verify the email using the OTP ${verificationOTP} by clicking this</b><a href="${varificationLink}">verify</a>`,
  };
  await transporter.sendMail(mailOptions);
  return verificationOTP;
}

async function sendForgetPasswordLink(user) {
  const { token } = await generateTokens(user, process.env.RESET_SECRET);
  // Send verification mail
  const resetPasswordLink = `http://localhost:5173/reset-password?token=${token}`;
  // verificatio email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user?.email,
    subject: 'Reset Password',
    html: `<p>welcome to code with dipesh, ${user?.email}<p><b>please reset password with this link by clicking this</b><a href="${resetPasswordLink}">&nbsp;Reset Password</a>`,
  };
  await transporter.sendMail(mailOptions);
  return token;
}

module.exports = {
  sendVerificationMail,
  sendForgetPasswordLink,
};
