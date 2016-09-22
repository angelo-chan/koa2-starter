import mongoose from 'mongoose';
import _ from 'lodash';
import Router from 'koa-router';
import redis from '../../components/cache/redis';

export default (apiRouter) => {
  const router = new Router({ prefix: '/health' });

  router
    .get('/', (ctx) => {
      ctx.body = {
        status: 'OK',
        msg: "I'm alive!",
      };
    })
    .get('/status', ctx => {
      const mongoStatus = mongoose.connection.readyState === 1 ? { status: 'UP' } : { status: 'DOWN' };
      const redisStatus = redis.status === 'ready' ? { status: 'UP' } : { status: 'DOWN' };
      const success = _.filter([mongoStatus, redisStatus],
          status => {
            if (status.status === 'DOWN') {
              return true;
            }
            return false;
          }).length === 0;
      const status = success ? 'UP' : 'DOWN';
      const code = success ? 200 : 503;
      ctx.status = code;
      ctx.body = {
        status,
        mongo: mongoStatus,
        redis: redisStatus,
      };
    });

  apiRouter.use(router.routes(), router.allowedMethods());
};
