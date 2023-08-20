const apiAdapter = require('../../apiAdapter');

const {
  SERVICE_COURSES_URL,
} = process.env;

const api = apiAdapter(SERVICE_COURSES_URL);

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const lesson = await api.get(`/api/lessons/${id}`);

    return res.json(lesson.data);
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
