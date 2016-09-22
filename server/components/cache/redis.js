import Redis from 'ioredis';
import config from '../../config/environment';
import log from '../logger';

const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  db: config.redis.db,
  retryStrategy() {
    return 2000;
  },
});

redis.on('error', (error) => {
  log.error(error.message);
});

export default redis;
