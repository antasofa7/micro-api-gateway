const apiAdapter = require('../../apiAdapter');

const {
  SERVICE_USERS_URL,
} = process.env;

const api = apiAdapter(SERVICE_USERS_URL);

module.exports = async (req, res) => {
  try {
    const user = await api.post('/users/register', req.body);

    return res.json(user.data);
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
