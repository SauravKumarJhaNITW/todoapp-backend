const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

app.use(express.json());

require("express-async-errors");
const winston = require("winston");
const Joi = require("joi");
const login = require("./routes/login");
const register = require("./routes/register");
const error = require("./middleware/error");
const todos = require("./routes/todos");
const dones = require("./routes/dones");
const home = require("./routes/home");
// const refresh = require("./routes/refresh");
// const forgotPassword = require("./routes/forgot-password");
Joi.objectId = require("joi-objectid")(Joi);

winston.exceptions.handle(
    new winston.transports.File({ filename: "uncaughtException.log" })
);

process.on("unhandledRejection", (ex) => {
    throw ex;
});

require("./startup/db")();
app.use("/todos", todos);
app.use("/dones", dones);
app.use("/register", register);
app.use("/login", login);
app.use("/", home);
// app.use("/refresh", refresh);
// app.use("/forgot-password", forgotPassword);
// after all app.use()
app.use(error);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});