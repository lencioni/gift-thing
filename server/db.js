import pgp from 'pg-promise';
import configs from '../database.json';

const config = configs.dev; // TODO change this based on env
export default pgp()(`postgres://${config.user}:${config.password}@${config.host}/${config.database}`);
