const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/gql/schema',
    createProxyMiddleware({
      target: 'https://dev.skyrealm.ai/',
      changeOrigin: true,
    }),
  );
};
