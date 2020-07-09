const JWT = require("./JWT");
const iat = Math.floor(Date.now() / 1000);

module.exports = async (user, accessTokenKey, refreshTokenKey) => {
  const accessToken = await JWT.encode({
    iss: process.env.TOKEN_ISSUER,
    aud: process.env.TOKEN_AUDIENCE,
    sub: user._id.toString(),
    iat: iat,
    param: accessTokenKey,
    exp: parseInt(iat + process.env.ACCESS_TOKEN_VALIDITY * 24 * 60 * 60),
  });

  if (!accessToken) throw new InternalError();

  const refreshToken = await JWT.encode({
    iss: process.env.TOKEN_ISSUER,
    aud: process.env.TOKEN_AUDIENCE,
    sub: user._id.toString(),
    iat: iat,
    param: refreshTokenKey,
    exp: parseInt(iat + process.env.REFRESH_TOKEN_VALIDITY * 24 * 60 * 60),
  });

  if (!refreshToken) throw new InternalError();

  return { accessToken, refreshToken };
};
