const JWT = require("./JWT");
const iat = Math.floor(Date.now() / 1000);

module.exports = async (user, accessTokenKey, refreshTokenKey) => {
  const accessToken = await JWT.encode({
    iss: tokenInfo.tokenIssuer,
    aud: tokenInfo.tokenAudience,
    sub: user._id.toString(),
    iat: iat,
    param: accessTokenKey,
    exp: iat + tokenInfo.accessTokenValidity * 24 * 60 * 60,
  });

  if (!accessToken) throw new Error("invalid access key data");

  const refreshToken = await JWT.encode({
    iss: tokenInfo.tokenIssuer,
    aud: tokenInfo.tokenAudience,
    sub: user._id.toString(),
    iat: iat,
    param: refreshTokenKey,
    exp: iat + tokenInfo.refreshTokenValidity * 24 * 60 * 60,
  });

  if (!refreshToken) throw new Error("invalid refresh token data");

  return { accessToken, refreshToken };
};

const tokenInfo = {
  accessTokenValidity: parseInt(30),
  refreshTokenValidity: parseInt(120),
  tokenIssuer: "Rishavchaudhary",
  tokenAudience: "Rishavchaudhary",
};
