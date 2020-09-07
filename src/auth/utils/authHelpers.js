const getAccessToken = (auth) => {
  if (!auth) throw new InvalidTokenError();
  if (!auth.startsWith("Bearer")) throw new InvalidTokenError();
  return auth.split(" ")[1];
};

module.exports = { getAccessToken };
