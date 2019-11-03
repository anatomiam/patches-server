const { prisma } = require("../prisma/generated/prisma-client");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./schema.graphql");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const express = require("express");
const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET
} = require("./utils");
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
app.get("/walleye", (req, res) => res.send("hello"));
app.post("/refresh_token", async (req, res) => {
  const token = req.cookies.refresh;
  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  let payload = null;
  try {
    payload = jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: "" });
  }

  // token is valid and
  // we can send back an access token and refresh refresh token
  const user = await prisma.user({ id: payload.userId });

  if (!user) {
    return res.send({ ok: false, accessToken: "" });
  }

  // TODO increment tokenVersion when user resets pw to invalidate refresh token
  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: "" });
  }

  sendRefreshToken(res, createRefreshToken(user, REFRESH_TOKEN_SECRET));

  return res.send({
    ok: true,
    accessToken: createAccessToken(user, ACCESS_TOKEN_SECRET)
  });
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
    db: prisma,
    debug: true
  })
});

server.applyMiddleware({ app, cors: false });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
