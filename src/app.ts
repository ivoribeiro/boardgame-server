import bluebird from "bluebird";
import mongoose from "mongoose";
import app from "./Controllers/express";

process.on("uncaughtException", (e) => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", (e) => {
  console.log(e);
  process.exit(1);
});

// Connect to MongoDB
const mongoUrl = "mongodb://localhost/test";
mongoose.Promise = bluebird;
mongoose.connect(mongoUrl, { useNewUrlParser: true }).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch((err) => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  // process.exit();
});

// Application Listning
app.listen(3000, () => {
  console.log("Express listening on port 3000!");
});

