const jwt = require('jsonwebtoken');

// Get the Token

const generateTokens = async (user, secret) => {
  let token = await jwt.sign(
    { data: { email: user?.email, id: user._id, role: user.role } },
    secret,
    {
      // expiresIn: new Date(new Date().getTime() + 15 * 60 * 1000),
      expiresIn: 60 * 2,
    }
  );

  let refreshToken = await jwt.sign(
    { data: { email: user?.email, id: user._id, role: user.role } },
    secret,
    {
      expiresIn: '7d',
    }
  );
  return { token, refreshToken };
};

const generateDecodedToken = async (token, secret) => {
  const { err, decoded } = await jwt.verify(
    token,
    secret,
    function (err, decoded) {
      console.log(decoded, 'from decoded');
      return { err, decoded };
    }
  );
  return { err, decoded };
};
module.exports = { generateTokens, generateDecodedToken };
