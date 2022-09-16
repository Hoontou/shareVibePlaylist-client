const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://share-vibe-pli.herokuapp.com',
      changeOrigin: true,
    })
  );
};
