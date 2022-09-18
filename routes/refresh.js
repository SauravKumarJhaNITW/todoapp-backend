const router = require("express").Router();
const auth = require("../middleware/auth");
const { User, validateUser } = require("../models/user");

router.get("/", auth, (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });
    res.send(user.generateAuthToken());
});

module.exports = router;