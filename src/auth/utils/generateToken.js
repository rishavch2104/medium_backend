const JWT = require("./JWT");
const iat = Math.floor(Date.now() / 1000);

module.exports = async (user, accessTokenKey, refreshTokenKey) => {
  const accessToken = await JWT.encode({
    iss: process.env.tokenIssuer,
    aud: process.env.tokenAudience,
    sub: user._id.toString(),
    iat: iat,
    param: accessTokenKey,
    exp: parseInt(iat + process.env.accessTokenValidity * 24 * 60 * 60),
  });

  if (!accessToken) throw new InternalError();

  const refreshToken = await JWT.encode({
    iss: tokenInfo.tokenIssuer,
    aud: tokenInfo.tokenAudience,
    sub: user._id.toString(),
    iat: iat,
    param: refreshTokenKey,
    exp: iat + tokenInfo.refreshTokenValidity * 24 * 60 * 60,
  });

  if (!refreshToken) throw new InternalError();

  return { accessToken, refreshToken };
};
