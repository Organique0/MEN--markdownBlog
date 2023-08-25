import app from "./app";
import env from "./validateEnv";
import mongoose from "mongoose";

const port = process.env.PORT || 3000;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose Connected");
    app.listen(port, () => {
      console.log("listening on port: " + port);
    });
  })
  .catch(console.error);
