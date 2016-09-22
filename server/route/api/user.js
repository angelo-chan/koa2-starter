import Router from 'koa-router';
import * as controller from '../../controllers/user.controller';
import { isAuthenticated } from '../../auth';

export default (apiRouter) => {
  const router = new Router({ prefix: '/users' });

  router.get('/info', isAuthenticated(), controller.info);

  apiRouter.use(router.routes(), router.allowedMethods());
};
