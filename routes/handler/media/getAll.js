const apiAdapter = require('../../apiAdapter');

const {
  SERVICE_MEDIA_URL,
} = process.env;

const api = apiAdapter(SERVICE_MEDIA_URL);

module.exports = async (req, res) => {
  try {
    const media = await api.get('/media');

    return res.json(media.data);
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
