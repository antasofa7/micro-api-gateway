const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token) {
      // eslint-disable-next-line prefer-destructuring
      token = token.split(' ')[1];
    }

    const decodedToken = await jwt.verify(token, JWT_SECRET);

    req.user = decodedToken;

    return next();
  } catch (err) {
    return res.status(403).json({
      status: 'error',
      message: err.message,
    });
  }
};
