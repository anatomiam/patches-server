const { prisma } = require("../prisma/generated/prisma-client");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./schema.graphql");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const Query = require("./resolvers/Query");
const Knob = require("./resolvers/Knob");
const Pedal = require("./resolvers/Pedal");
const Patch = require("./resolvers/Patch");
const Preset = require("./resolvers/Preset");
const User = require("./resolvers/User");
const Mutation = require("./resolvers/Mutation");

const resolvers = {
  Query,
  Mutation,
  Knob,
  Pedal,
  Patch,
  Preset,
  User
};

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

app.use(cookieParser());
app.get("/walleye", (_req, res) => res.send("hello"));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
    db: prisma,
    debug: true
  })
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
