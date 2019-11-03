const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = "access-ishouldbeanenvironmentvariable";
const REFRESH_TOKEN_SECRET = "refresh-ishouldbeanenvironmentvariable";

function createAccessToken(user, accessTokenSecret) {
  return jwt.sign({ userId: user.id }, accessTokenSecret, {
    expiresIn: "15m"
  });
}

function createRefreshToken(user, refreshTokenSecret) {
  return jwt.sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    refreshTokenSecret,
    {
      expiresIn: "7d"
    }
  );
}

function sendRefreshToken(res, token) {
  res.cookie("refresh", token, {
    httpOnly: true,
    path: "/refresh_token"
  });
}

function getUserId(context) {
  const authorization = context.req.get("Authorization");
  if (authorization) {
    const token = authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET);
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
