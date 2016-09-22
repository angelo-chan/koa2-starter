import path from 'path';
import _ from 'lodash';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// environment configurations will extend this base configuration
// ==============================================================
const base = {
  env: process.env.NODE_ENV,

  // root path of server
  root: path.normalize(`${__dirname}/../../..`),

  // server port
  port: process.env.PORT || 9000,

  // server ip
  ip: process.env.IP || '0.0.0.0',

  keys: ['koa2-starter'],

  jwt: {
    secret: 'koa2-starter-secret',
    expiresInSeconds: 60 * 60 * 10,
  },

  //
  seedDB: false,

  cors: true,

  // mongodb connection options
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost/koa2-starter',
    options: {
      db: {
        safe: true,
      },
    },
  },

  // redis setting
  redis: {
    host: '127.0.0.1',
    port: 6379,
    db: 1,
  },

};


/* eslint-disable global-require */
const envConfig = require(`./${process.env.NODE_ENV}`).default;
/* eslint-enable global-require */

const config = _.merge(
  base, envConfig);

// export configuration based on NODE_ENV
// ==============================================
export default config;
