const apiAdapter = require('../../apiAdapter');

const {
  SERVICE_ORDER_PAYMENT_URL,
} = process.env;

const api = apiAdapter(SERVICE_ORDER_PAYMENT_URL);

module.exports = async (req, res) => {
  console.log(req);
  try {
    const userId = req.user.id;
    const orders = await api.get('/api/orders', {
      params: {
        user_id: userId,
      },
    });

    return res.json(orders.data);
  } catch (err) {
    if (err.code === 'ECONNREFUSED') {
      return res.status(500).json({
        status: 'error',
        message: 'Service unavailabel!',
      });
    }
    console.log('error', err);

    const { status, data } = err.response;

    return res.status(status).json(data);
  }
};
