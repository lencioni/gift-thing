import WebpackDevMiddleware from 'webpack-dev-middleware';

import config from '../../config';

const paths = config.utils_paths;
const debug = require('debug')('app:server:webpack-dev');

export default function ({ compiler, publicPath }) {
  debug('Enable Webpack dev middleware.');

  /* eslint-disable key-spacing */
  /* eslint-disable new-cap */
  return WebpackDevMiddleware(compiler, {
    publicPath,
    contentBase : paths.base(config.dir_client),
    hot         : true,
    quiet       : config.compiler_quiet,
    noInfo      : config.compiler_quiet,
    lazy        : false,
    stats       : config.compiler_stats,
  });
  /* eslint-enable new-cap */
  /* eslint-enable key-spacing */
}
