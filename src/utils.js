const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = "access-ishouldbeanenvironmentvariable";
const REFRESH_TOKEN_SECRET = "refresh-ishouldbeanenvironmentvariable";

function createAccessToken(user) {
  return jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m"
  });
}

function createRefreshToken(user) {
  return jwt.sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d"
    }
  );
}

function sendRefreshToken(res, token) {
  res.cookie("refresh", token, {
    httpOnly: true,
    path: "/"
  });
}

function getUserId(context) {
  const authorization = context.req.get("Authorization");
  if (authorization) {
    const token = authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, ACCESS_TOKEN_SECRET);
    return userId;
  }

  throw new Error("Not authenticated");
}

module.exports = {
  ACCESS_TOKEN_SECRET,
  createAccessToken,
  createRefreshToken,
  getUserId,
  REFRESH_TOKEN_SECRET,
  sendRefreshToken
};
