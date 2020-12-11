const keyStore = require("./../models/keyStore");

module.exports = {
  createKey: (id, accessTokenKey, refreshTokenKey) => {
    return keyStore.create({ user: id, accessTokenKey, refreshTokenKey });
  },
  findKeyByParams: (params) => {
    return keyStore.findOne(params);
  },
  deleteKeyById: async (id) => {
    await keyStore.findByIdAndDelete(id);
  },
};
