require("express-async-errors");
const express = require("express");
const winston = require("winston");
const Joi = require("joi");
const login = require("./routes/login");
const register = require("./routes/register");
const error = require("./middleware/error");
const todos = require("./routes/todos");
const dones = require("./routes/dones");
const cors = require("cors");

Joi.objectId = require("joi-objectid")(Joi);

winston.exceptions.handle(
  new winston.transports.File({ filename: "uncaughtException.log" })
);

process.on("unhandledRejection", (ex) => {
  throw ex;
});

const app = express();
require("./startup/db")();

app.use(express.json());
app.use(cors());
app.use("/todos", todos);
app.use("/dones", dones);
app.use("/register", register);
app.use("/login", login);
// after all app.use()
app.use(error);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
