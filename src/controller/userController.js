const bcrypt = require("bcrypt");
const generateKeys = require("./../auth/utils/generateKeys");
const userService = require("./../database/services/userService");
const keyStoreService = require("./../database/services/keyStoreService");
const generateTokens = require("./../auth/utils/generateToken");
const JWT = require("./../auth/utils/JWT");
const { SuccessResponse } = require("./../helpers/apiResponse");
const {
  NotFoundError,
  AlreadyExistsError,
  IncorrectPasswordError,
  InvalidTokenError,
  AlreadyLoggedInError,
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
    return new SuccessResponse("SignUp Successful", {
      user: addedUser,
      tokens,
    }).send(res);
  },
  loginUser: async (req, res, next) => {
    const { email, password } = req.body;

    const user = await userService.findUserByEmail(email);

    if (!user) {
      return next(new NotFoundError("user"));
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) return next(new IncorrectPasswordError());

    const { accessTokenKey, refreshTokenKey } = generateKeys();

    const keyStore = await keyStoreService.findKeyByParams(user._id);
    if (keyStore) return next(new AlreadyLoggedInError());

    await keyStoreService.createKey(user._id, accessTokenKey, refreshTokenKey);
    const tokens = await generateTokens(user, accessTokenKey, refreshTokenKey);
    return new SuccessResponse("Logged in successfully", tokens).send(res);
  },
  logoutUser: async (req, res, next) => {
    await keyStoreService.deleteKeyById(req.keystore._id);
    return new SuccessResponse("Logged Out successfully").send(res);
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
    return new SuccessResponse("New Tokens Created", tokens).send(res);
  },
};
