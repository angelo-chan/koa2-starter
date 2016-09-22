import { GraphQLSchema } from 'graphql';
import graphqlHTTP from 'koa-graphql';
import convert from 'koa-convert';
import _ from 'lodash';
import queries from './queries';
import mutations from './mutations';

const graphiql = process.env.NODE_ENV !== 'production';

const schema = new GraphQLSchema({
  query: queries,
  mutation: mutations,
});

export default (options) => convert(graphqlHTTP(_.merge(options || {}, { schema, graphiql })));
