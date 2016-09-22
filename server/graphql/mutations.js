import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'root mutation these are the things we can change',
  fields: {
    hello: {
      type: GraphQLString,
      description: 'hello you!',
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (root, { name }) => `hello ${name}!`,
    },
  },
});
