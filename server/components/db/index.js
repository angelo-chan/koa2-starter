import mongoose from 'mongoose';
import Promise from 'bluebird';
import logger from '../logger';
import config from '../../config/environment';

export default function connect() {
  return new Promise((resolve, reject) => {
    mongoose.connection
      .on('error', (error) => reject(error))
      .on('close', () => logger.info('Database connection closed.'))
      .on('open', () => resolve(mongoose.connections[0]));

    mongoose.connect(config.mongo.uri, config.mongo.options);
  });
}
