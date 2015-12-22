import { argv } from 'yargs';

export default (config) => {
  const HMR_ENABLED = !!argv.hot;
  const overrides = {
    compiler_enable_hmr: HMR_ENABLED,
    fb: {
      app_id: '1500069193630452',
      app_secret: '39b21db25cd8806ffd274faaed91c5dc',
      callback_url: 'http://localhost:3000/auth/login/facebook/callback',
    },
  };

  // We use an explicit public path when the assets are served by webpack
  // to fix this issue:
  // http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
  if (HMR_ENABLED) {
    overrides.compiler_public_path = (
      `http://${config.server_host}:${config.server_port}/`
    );
  }

  return overrides;
};
