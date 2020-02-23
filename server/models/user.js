/*
TODO:
    1. User model
    2. User model methods (setPassword, validatePassword, generateJWT)
    3. Password hashing
    4. Crypto module
    5. Joi validation

*/

const mongoose = require("mongoose");
const Joi = require("Joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, index: true },
    password: String,
    salt: String,
    createdAt: { type: Date, default: Date.now }
});

function validate(userData) {
    const joiSchema = Joi.object({
        firstName: Joi.string()
            .min(3)
            .max(15)
            .required(),
        lastName: Joi.string()
            .min(3)
            .max(15)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(5)
            .required()
    });
    return Joi.validate(userData, joiSchema);
}

userSchema.methods.setPassword = function(password) {
    this.salt = 10;
    this.password = password;
};

userSchema.methods.validatePassword = function(password) {
    return this.password == password;
};

userSchema.methods.generateJWT = function() {
    return jwt.sign(
        { id: this._id, email: this.email },
        config.get("privateKey"),
        { expiresIn: 1 }
    );
};

const User = mongoose.model("User", userSchema);

module.exports = { User, validate };
