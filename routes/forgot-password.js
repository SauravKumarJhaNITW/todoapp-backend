const router = require("express").Router();
const { User } = require("../models/user");
const sendMail = require("../services/mailService")
router.post("/", async(req, res) => {
    if (!req.body.username) return res.status(400).send("username not received");
    let user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("user not registered");
    const secret = process.env.jwtPrivateKey + user.password;
    const token = jwt.sign({
            _id: user._id,
            username: user.username,
        },
        secret, {
            algorithm: "HS256",
            expiresIn: parseInt(process.env.forgotPasswordLinkExpirySeconds),
        }
    );
    //create url with token
    //send the url to email , 
    //if email sent successfully, send 200 else 500
});

module.exports = router;