const express = require("express");
const Router = express.Router();
const authorise = require("../middleware/authorise");

Router.get("/", authorise, (req, res) => {
    res.send("Server End Point");
});

module.exports = Router;
