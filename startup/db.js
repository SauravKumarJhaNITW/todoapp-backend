require("dotenv").config();
const mongoose = require("mongoose");

module.exports = async function connectDB() {
  const db = process.env.db;
  await mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log(`connected to ${db}..`));
};
