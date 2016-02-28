import pgPromise from 'pg-promise';

import configs from '../database.json';

const config = configs.dev; // TODO change this based on env
export default pgPromise()(`postgres://${config.user}:${config.password}@${config.host}/${config.database}`);
