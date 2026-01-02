const { findUser } = require('../services/authservices');
const { generateDecodedToken } = require('../utils/authHandler');
const ErrorHandler = require('../utils/errorHandler');

exports.authenticatedRoutes = async (req, res, next) => {
  try {
    let secretKey;
    let token;
    if (req.path.startsWith('/reset-password')) {
      secretKey = process.env.RESET_SECRET;
      token = req.header('Authorization')?.replace('Bearer ', '');
    } else {
      secretKey = process.env.LOGIN_SECRET;
      token =
        req.cookies?.accessToken ||
        req.header('Authorization')?.replace('Bearer ', '');
    }
    // extracting token
    console.log(token, 'from token  in line 19', req.cookies?.accessToken);
    // if token is not there
    if (!token) {
      res.status(401).json({
        message: 'Token Not Found',
      });
      throw new ErrorHandler('Token Not Found', 401);
    }

    // Determine which API is being served

    // verify the incoming refresh token requred token and secret key
    const { err, decoded } = await generateDecodedToken(token, secretKey);
    if (err) {
      throw new ErrorHandler('Token Invalid or Expire', 403);
    }

    req.user = decoded.data;
    next();
  } catch (error) {
    next(error);
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Forbidden: You dont have access',
      });
    }
    next();
  };
};
