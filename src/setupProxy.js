const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function setupProxy(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://tech-heim-indj.onrender.com',
      changeOrigin: true,
      proxyTimeout: 20000,
      timeout: 20000,
      pathRewrite: {
        '^/api': ''
      }
    })
  );
};
