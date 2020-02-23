const errorhandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Server Error!");
};

module.exports = errorhandler;
