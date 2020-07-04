const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const keyStoreSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  accessTokenKey: {
    type: Schema.Types.String,
    required: true,
  },
  refreshTokenKey: {
    type: Schema.Types.String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

const keyStore = mongoose.model("keyStore", keyStoreSchema);

module.exports = keyStore;
