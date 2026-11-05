// Database settings for both sequelize-cli and the app. Loads the repo-root .env.
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env'), quiet: true });

const shared = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  dialect: 'postgres',
  logging: false,
};

module.exports = {
  development: { ...shared, database: 'volunteers' },
  test: { ...shared, database: 'volunteers_test' },
};
