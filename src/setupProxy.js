const { createProxyMiddleware } = require('http-proxy-middleware');
const { ENDPOINT_URL } = require("./api");

module.exports = (app) => {
  app.use('/api', createProxyMiddleware({
    target: ENDPOINT_URL,
    changeOrigin: true
  }));
}
