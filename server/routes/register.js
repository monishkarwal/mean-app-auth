const express = require("express");
const Router = express.Router();

const { User, validate } = require("../models/user");

Router.get("/", (req, res) => {
    res.send("Register End Point");
});

Router.post("/", async (req, res) => {
    const result = validate(req.body);

    const { value, error } = result;

    if (error) {
        res.json({
            errorType: error.name,
            errorMessage: error.details[0].message
        });
    }

    let user = await User.findOne({ email: req.body.email });

    if (user) {
        res.json({
            message: "User already exists!"
        });
    } else {
        user = new User(value);
        await user.save();
        res.send(user);
    }
});

module.exports = Router;
