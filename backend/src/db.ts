import { Sequelize } from 'sequelize';
import config from './database/config.cjs';

const settings = process.env.NODE_ENV === 'test' ? config.test : config.development;

export const sequelize = new Sequelize(settings.database, settings.username, settings.password ?? '', {
  host: settings.host,
  port: settings.port,
  dialect: 'postgres',
  logging: false,
});
