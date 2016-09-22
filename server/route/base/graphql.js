import graphql from '../../graphql';

export default (router) => {
  router
    .all('/graphql', graphql());
};
