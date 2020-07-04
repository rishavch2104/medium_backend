const JWT = require("jsonwebtoken");
const path = require("path");
const { promisify } = require("util");
const { readFile } = require("fs");

const readPublicKey = () => {
  return promisify(readFile)(path.join(__dirname, "../keys/public.pem"));
};
const readPrivateKey = () => {
  return promisify(readFile)(path.join(__dirname, "../keys/private.pem"));
};
//
module.exports = {
  encode: async (payload) => {
    const cert = await readPrivateKey();
    if (!cert) throw new Error("Token generation failure");
    return promisify(JWT.sign)({ ...payload }, cert, { algorithm: "RS256" });
  },
  validate: async (token) => {
    const cert = await readPublicKey();
    try {
      return promisify(JWT.verify)(token, cert);
    } catch {
      (err) => console.log(err);
    }
  },
  decode: async (token) => {
    const cert = await readPublicKey();
    try {
      return promisify(JWT.verify)(token, cert, { ignoreExpiration: true });
    } catch {
      (err) => console.log(err);
    }
  },
};
