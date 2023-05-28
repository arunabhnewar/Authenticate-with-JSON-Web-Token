const express = require("express");
const mongoose = require("mongoose");
const userHandler = require("./routeHandler/userHandler");
const dotenv = require("dotenv");


// express app initialization
const app = express();
dotenv.config();
app.use(express.json());


// application routes
app.use("/user", userHandler);


// database connection with mongoose
async function myDB() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connection successful");
    } catch (error) {
        console.log(error)
    }
}


// default error handler
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}

app.use(errorHandler);

// App Listen
app.listen(process.env.PORT || 3000, () => {
    myDB();
    console.log("app listening at port 3000");
});