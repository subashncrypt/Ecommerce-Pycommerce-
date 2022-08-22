/*
 * @author: Adesh Nalpet Adimurthy
 * MongoDB Database connection details.
 */

const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
const _DBUrl =
  process.env.DB ||
  "mongodb+srv://admin:3VYmUw7jOp9H@cluster0.3ewe2.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(_DBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(`Error : ${err}`));
