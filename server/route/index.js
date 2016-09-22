import compose from 'koa-compose';
import Router from 'koa-router';
import importDir from 'import-dir';
import _ from 'lodash';

const routers = [{ folder: 'base', prefix: '' }, { folder: 'api', prefix: '/api' }];

export default function () {
  const composed = _.reduce(routers, (accumulator, curr) => {
    const routes = importDir(`./${curr.folder}`);
    const router = new Router({
      prefix: curr.prefix,
    });
    _.each(_.values(routes), route => route(router));
    return [router.routes(), router.allowedMethods(), ...accumulator];
  }, []);

  return compose(composed);
}
