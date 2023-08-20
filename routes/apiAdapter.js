const axios = require('axios');

const { TIME_OUT } = process.env;

module.exports = (baseURL) => axios.create({
  baseURL,
  timeout: parseInt(TIME_OUT, 10),
});
