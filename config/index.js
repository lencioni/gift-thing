import _debug from 'debug';

import base from './_base';

const debug = _debug('app:config');
debug('Create configuration.');

debug(`Apply environment overrides for NODE_ENV "${base.env}".`);
let overrides;
try {
  overrides = require(`./_${base.env}`)(base);
} catch (e) {
  debug(
    `No configuration overrides found for NODE_ENV "${base.env}"`
  );
}

export default Object.assign({}, base, overrides);
