import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'root query these are the things we can fetch',
  fields: {
    hello: {
      type: GraphQLString,
      description: 'hello',
      resolve: () => 'hello!',
    },
  },
});
