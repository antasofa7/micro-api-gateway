const apiAdapter = require('../../apiAdapter');

const {
  SERVICE_ORDER_PAYMENT_URL,
} = process.env;

const api = apiAdapter(SERVICE_ORDER_PAYMENT_URL);

module.exports = async (req, res) => {
  try {
    const webhook = await api.post('/api/webhook', req.body);
    console.log(webhook);

    return res.json(webhook.data);
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
