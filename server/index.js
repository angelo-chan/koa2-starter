import Promise from 'bluebird';
import moment from 'moment-timezone';
import Koa from 'koa';
import mongoose from 'mongoose-fill';
import route from './route';
import config from './config/environment';
import { DEFAULT_TIMEZONE } from './components/constants';
import logger from './components/logger';
import middleware from './middleware';
import auth from './auth';
import connect from './components/db';
import User from './models/user.model';

// set default timezone
moment.tz.setDefault(DEFAULT_TIMEZONE);
mongoose.Promise = Promise;

const app = new Koa();

app.keys = config.keys;

app.use(middleware());
app.use(auth());
app.use(route());

app.use((ctx) => {
  ctx.status = 404;
});

// connect to mongodb
(async() => {
  try {
    const connection = await connect();
    logger.info('connected to MongoDB %s:%s/%s', connection.host, connection.port, connection.name);

    // populate a system admin if not exist
    User.findOneOrCreate({ username: 'koa2' },
      { username: 'koa2', password: 'koa2' },
      (err) => {
        if (err) {
          logger.error('Initialize default account failed!');
        } else {
          logger.info('Initialize default account successfully');
        }
      });

    // seed db if necessary
    if (config.seedDB) {
      /* eslint-disable global-require */
      require('./config/seed');
      /* eslint-enable global-require */
    }
  } catch (error) {
    logger.error(error);
    process.exit(-1);
  }

  await app.listen(config.port, config.ip);
  logger.info('Server start at %s:%s', config.ip, config.port);
})();
