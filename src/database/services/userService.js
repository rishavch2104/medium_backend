const Users = require("./../models/users");
const keyStoreService = require("./../services/keystoreService");
const generateKeys = require("./../../auth/utils/generateKeys");

module.exports = {
  findUserByEmail: (email) => {
    return Users.findOne({ email: email });
  },
  findUserById: (id) => {
    return Users.findById(id);
  },
  addUser: async (user, accessTokenKey, refreshTokenKey) => {
    const newUser = await Users.create(user);

    const keys = await keyStoreService.createKey(
      newUser._id,
      accessTokenKey,
      refreshTokenKey
    );
    return newUser;
  },
};
