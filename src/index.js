const { prisma } = require("../prisma/generated/prisma-client");
const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema.graphql");

const resolvers = {
  Query: {
    knob(root, args, context) {
      return context.db.knob({ id: args.knobId });
    },
    knobsByUser(root, args, context) {
      return context.db
        .user({
          id: args.userId
        })
        .knobs();
    }
  },
  Mutation: {
    createDraft(root, args, context) {
      return context.db.createKnob({
        title: args.title,
        builder: {
          connect: { id: args.userId }
        }
      });
    },
    createUser(root, args, context) {
      return context.db.createUser({ name: args.name, email: args.email });
    }
  },
  User: {
    knobs(root, args, context) {
      return context.db
        .user({
          id: root.id
        })
        .knobs();
    }
  },
  Knob: {
    builder(root, args, context) {
      return context.db
        .knob({
          id: root.id
        })
        .builder();
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
    db: prisma
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
