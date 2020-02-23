const express = require("express");
const { User, validate } = require("../models/user");
const Router = express.Router();

Router.get("/", (req, res) => {
    res.send("Login End Point");
});

Router.post("/", async (req, res) => {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
        let result = user.validatePassword(req.body.password);
        if (result) {
            let _token = await user.generateJWT();
            return res.send({
                token: _token
            });
        }
    }
    return res.send({
        message: "Invalid Username or Password!"
    });
});

module.exports = Router;
