const JWT = require("./JWT");
const iat = Math.floor(Date.now() / 1000);
module.exports = async (user, accessTokenKey, refreshTokenKey) => {
  const accessToken = await JWT.encode({
    iss: process.env.tokenIssuer,
    aud: process.env.tokenAudience,
    sub: user._id.toString(),
    iat: iat,
    param: accessTokenKey,
    exp: iat + process.env.accessTokenValidity * 24 * 60 * 60,
  });
  console.log(accessToken);
  if (!accessToken) throw new Error("invalid access key data");

  const refreshToken = await JWT.encode({
    iss: process.env.tokenIssuer,
    aud: process.env.tokenAudience,
    sub: user._id.toString(),
    iat: iat,
    param: refreshTokenKey,
    exp: iat + process.env.refreshTokenValidity * 24 * 60 * 60,
  });

  if (!refreshToken) throw new Error("invalid refresh token data");

  return { accessToken, refreshToken };
};
