const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 1,
    maxlength: 100,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    process.env.jwtPrivateKey,
    {
      algorithm: "HS256",
      expiresIn: parseInt(process.env.jwtExpirySeconds),
    }
  );
  return token;
};

userSchema.methods.generateAuthTokenWithLongerExpiry = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    process.env.jwtPrivateKey,
    {
      algorithm: "HS256",
      expiresIn: parseInt(process.env.jwtLongerExpirySeconds),
    }
  );
  return token;
};
const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().email().min(1).max(100).required(),
    password: Joi.string().min(5).required(),
  });

  return schema.validate(user);
}

module.exports = {
  User,
  validateUser,
};
