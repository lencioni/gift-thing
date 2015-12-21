import WebpackHotMiddleware from 'webpack-hot-middleware';

const debug = require('debug')('app:server:webpack-hmr');

export default function ({ compiler }) {
  debug('Enable Webpack Hot Module Replacement (HMR).');

  /* eslint-disable new-cap */
  return WebpackHotMiddleware(compiler);
  /* eslint-enable new-cap */
}
