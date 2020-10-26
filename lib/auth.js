const Configstore = require("configstore");
const { default: fetch } = require("node-fetch");
const configStore = new Configstore("cli");
module.exports = {
  checkTokenExists: () => {
    return configStore.get("token") ? true : false;
  },
  handleSign: async (credentials) => {
    return new Promise((resolve) =>
      setTimeout(
        resolve({
          success: credentials
        }),
        2000
      )
    );
  },
  storeToken: (token) => {
    configStore.set("token", token);
  },
  clearToken: () => {
    configStore.clear("token");
  },
  validateToken: async (token) => {
    return true;
  }
};
