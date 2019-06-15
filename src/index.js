const { prisma } = require("../prisma/generated/prisma-client");
const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema.graphql");
const Query = require("./resolvers/Query");
const Knob = require("./resolvers/Knob");
const Pedal = require("./resolvers/Pedal");
const Mutation = require("./resolvers/Mutation");

const resolvers = {
  Query,
  Mutation,
  Knob,
  Pedal
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
    db: prisma,
    debug: true
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
