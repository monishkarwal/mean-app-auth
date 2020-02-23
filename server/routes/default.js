const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) => {
    res.send("Server End Point");
});

module.exports = Router;
