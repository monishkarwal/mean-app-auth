const mongoose = require("mongoose");
const Joi = require("Joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const crypto = require("crypto");

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
    this.salt = crypto.randomBytes(16).toString("hex");
    this.password = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");
};

userSchema.methods.validatePassword = function(password) {
    let _password = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");
    return this.password == _password;
};

userSchema.methods.generateJWT = function() {
    return jwt.sign(
        { id: this._id, email: this.email },
        config.get("privateKey"),
        { expiresIn: "5m" }
    );
};

const User = mongoose.model("User", userSchema);

module.exports = { User, validate };
