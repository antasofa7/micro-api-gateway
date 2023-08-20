const jwt = require('jsonwebtoken');

const apiAdapter = require('../../apiAdapter');

const {
  SERVICE_USERS_URL,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
//   JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;

const api = apiAdapter(SERVICE_USERS_URL);

module.exports = async (req, res) => {
  try {
    const refreshToken = req.body.refresh_token;
    const { email } = req.body;

    if (!refreshToken || !email) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid token',
      });
    }

    await api.get('/refresh-token', {
      params: {
        refresh_token: refreshToken,
      },
    });

    await jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          status: 'error',
          message: err.message,
        });
      }

      if (email !== decoded.email) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid email!',
        });
      }

      const token = jwt.sign({
        data: decoded,
      }, JWT_SECRET, {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
      });

      return res.json({
        status: 'success',
        token,
      });
    });
  } catch (err) {
    if (err.code === 'ECONNREFUSED') {
      return res.status(500).json({
        status: 'error',
        message: 'Service unavailabel!',
      });
    }

    const { status, data } = err.response;

    return res.status(status).json(data);
  }
};
