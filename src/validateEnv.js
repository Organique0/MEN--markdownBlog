const { cleanEnv } = require("envalid");
const { port, str } = require("envalid/dist/validators");

const x = cleanEnv(process.env, {
  MONGO_CONNECTION_STRING: str(),
  PORT: port(),
  SESSION_SECRET: str(),
  NODE_ENV: str()
});

module.exports = x;
