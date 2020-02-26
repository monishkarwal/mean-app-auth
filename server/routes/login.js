const express = require("express");
const Joi = require("Joi");
const { User } = require("../models/user");
const Router = express.Router();

Router.get("/", (req, res) => {
    res.send("Login End Point");
});

Router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).json({
            errorType: error.name,
            errorMessage: error.details[0].message
        });

    let user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send({
            message: "Invalid Username or Password!"
        });

    let result = await user.validatePassword(req.body.password);
    if (!result)
        return res
            .status(400)
            .send({ message: "Invalid Username or Password!" });

    let _token = await user.generateJWT();
    res.send({
        token: _token
    });
});

function validate(req) {
    const schema = {
        email: Joi.string()
            .min(2)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(5)
            .max(255)
            .required()
    };

    return Joi.validate(req, schema);
}

module.exports = Router;
