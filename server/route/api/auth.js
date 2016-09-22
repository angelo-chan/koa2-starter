import { authLocal } from '../../auth';

export default (router) => {
  router.post('/auth', authLocal);
};
