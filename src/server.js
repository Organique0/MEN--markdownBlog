const app = require("./app");
const env = require("./validateEnv");
mongoose = require("mongoose");
const dns = require("node:dns");
dns.setDefaultResultOrder("ipv4first");

const port = process.env.PORT || 5000;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose Connected");
    app.listen(port, () => {
      console.log("listening on port: " + port);
    });
  })
  .catch(console.error);
