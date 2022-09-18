const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validateUser({
    username: req.body.username,
    password: req.body.password,
  });
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  if (req.body.longerExpiry)
    return res.send(user.generateAuthTokenWithLongerExpiry());
  res.send(user.generateAuthToken());
});

module.exports = router;
