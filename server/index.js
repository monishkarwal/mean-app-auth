// Common Modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("config");

// Routes
const defaultRoute = require("./routes/default");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const protectedRoute = require("./routes/protected");

// Middleware
const errorHandler = require("./middleware/errorHandler");

// App specific variables
const app = express();
const PORT = config.get("port");
const dbUrl = config.get("dbUrl");

// Express configuration
app.use(express.json());
app.use(cors());
app.use(errorHandler);

// Database Configuration
mongoose
    .connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log("Connected with Database successfully..."))
    .catch(error => console.log("Connection with Database failed!", error));

// Routes Cofiguration
app.use("/", defaultRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/protected", protectedRoute);

app.listen(PORT, () => console.log(`Served at Port: ${PORT}...`));
