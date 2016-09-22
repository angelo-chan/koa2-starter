/* eslint-disable import/no-unresolved */
import ver from '../../../version.json';
/* eslint-enable import/no-unresolved */

export default (router) => {
  router.get('/version', (ctx) => {
    ctx.body = ver;
  });
};
