const apiAdapter = require('../../apiAdapter');

const {
  SERVICE_COURSES_URL,
} = process.env;

const api = apiAdapter(SERVICE_COURSES_URL);

module.exports = async (req, res) => {
  try {
    const userId = req.user.id;
    const courseId = req.body.course_id;

    const myCourse = await api.post('/api/my-courses', {
      user_id: userId,
      course_id: courseId,
    });

    return res.json(myCourse.data);
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
