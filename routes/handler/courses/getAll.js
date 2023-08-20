const apiAdapter = require('../../apiAdapter');

const {
  SERVICE_COURSES_URL,
  HOST_NAME,
} = process.env;

const api = apiAdapter(SERVICE_COURSES_URL);

module.exports = async (req, res) => {
  try {
    const courses = await api.get('/api/courses', {
      params: {
        ...req.query,
        status: 'PUBLISHED',
      },
    });

    const coursesData = courses.data;
    const firstPage = coursesData.data.first_page_url.split('?').pop();
    const lastPage = coursesData.data.last_page_url.split('?').pop();

    coursesData.data.first_page_url = `${HOST_NAME}/courses?${firstPage}`;
    coursesData.data.last_page_url = `${HOST_NAME}/courses?${lastPage}`;

    if (coursesData.data.next_page_url) {
      const nextPage = coursesData.data.next_page_url.split('?').pop();
      coursesData.data.next_page_url = `${HOST_NAME}/courses?${nextPage}`;
    }

    if (coursesData.data.prev_page_url) {
      const prevPage = coursesData.data.prev_page_url.split('?').pop();
      coursesData.data.prev_page_url = `${HOST_NAME}/courses?${prevPage}`;
    }

    coursesData.data.path = `${HOST_NAME}/courses`;

    const { links } = coursesData.data;

    if (links.length > 0) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < links.length; i++) {
        const { url } = links[i];
        if (url) {
          coursesData.data.links[i].url = `${HOST_NAME}/courses?${url.split('?').pop()}`;
        }
      }
    }

    return res.json(coursesData);
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
