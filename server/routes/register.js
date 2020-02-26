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
        return res.status(400).json({
            errorType: error.name,
            errorMessage: error.details[0].message
        });
    }

    let user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(400).json({
            message: "User already exists!"
        });
    } else {
        user = new User(value);
        user.setPassword(value.password);
        await user.save();
        res.send({
            message: "Successfully Registered!"
        });
    }
});

module.exports = Router;
