const bcrypt = require("bcrypt");
const generateKeys = require("./../auth/utils/generateKeys");
const userService = require("./../database/services/userService");
const keyStoreService = require("./../database/services/keyStoreService");
const generateTokens = require("./../auth/utils/generateToken");
const JWT = require("./../auth/utils/JWT");
const {
  NotFoundError,
  AlreadyExistsError,
  IncorrectPasswordError,
  InvalidTokenError,
} = require("./../errorHandling/apiError");

module.exports = {
  signUpUser: async (req, res, next) => {
    const userData = req.body;

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const existingUser = await userService.findUserByEmail(userData.email);
    if (existingUser !== null) {
      return next(new AlreadyExistsError());
    }

    const { accessTokenKey, refreshTokenKey } = generateKeys();

    const addedUser = await userService.addUser(
      userData,
      accessTokenKey,
      refreshTokenKey
    );

    const tokens = await generateTokens(
      addedUser,
      accessTokenKey,
      refreshTokenKey
    );
    return res.status(200).json(tokens);
  },
  loginUser: async (req, res, next) => {
    const { email, password } = req.body;

    const user = await userService.findUserByEmail(email);

    if (!user) {
      return next(new NotFoundError());
    }

    const match = bcrypt.compare(password, user.password);
    if (!match) return next(new IncorrectPasswordError());

    const { accessTokenKey, refreshTokenKey } = generateKeys();
    const tokens = await generateTokens(user, accessTokenKey, refreshTokenKey);
    return res.status(200).json(tokens);
  },

  refreshToken: async (req, res, next) => {
    const accessToken = req.headers.authorization;
    const accessTokenPayLoad = await JWT.decode(accessToken);
    const user = await UserService.findUserById(accessTokenPayLoad.sub);
    if (!user) return next(new NotFoundError());

    const refreshTokenPayload = await JWT.validate(req.body.refreshToken);
    if (accessTokenPayLoad.sub !== refreshTokenPayload.sub)
      return next(new InvalidTokenError());
    const keyStore = await keyStoreService.findKeyByParams(
      user._id,
      accessTokenPayLoad.param,
      refreshTokenPayload.param.param
    );
    if (!keyStore) return next(new InvalidTokenError());
    await keyStoreService.deleteKeyById(keyStore._id);
    const { accessTokenKey, refreshTokenKey } = generateKeys();
    const tokens = await generateTokens(user, accessTokenKey, refreshTokenKey);
    return res.status(200).json(tokens);
  },
};
