const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) => {
    res.send("Login End Point");
});

module.exports = Router;
