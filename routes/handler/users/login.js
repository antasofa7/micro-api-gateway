const jwt = require('jsonwebtoken');

const apiAdapter = require('../../apiAdapter');

const {
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;

const {
  SERVICE_USERS_URL,
} = process.env;

const api = apiAdapter(SERVICE_USERS_URL);

module.exports = async (req, res) => {
  try {
    const user = await api.post('/users/login', req.body);

    const { data } = user.data;

    const token = jwt.sign(data, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED });

    const refreshToken = jwt.sign(data, JWT_SECRET_REFRESH_TOKEN, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRED,
    });

    await api.post('/refresh-token', {
      refresh_token: refreshToken,
      user_id: data.id,
    });

    return res.json({
      status: 'success',
      data: {
        token,
        refresh_token: refreshToken,
      },
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
