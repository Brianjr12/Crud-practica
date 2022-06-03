// npm run dev
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql2');
const myConnections = require('express-myconnection');

const app = express();

// importing routes
const customerRoutes = require('./routes/customer');

// settings
app.set("port", process.env.PORT || 3000);
app.set("views engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middlewares
app.use(morgan("dev"));
app.use(myConnections(mysql,{
    host: "localhost",
    user: "root",
    password: "31740105120404",
    port: 3306,
    database: "crud-data-base"
}, "single"));
app.use(express.urlencoded({
    extended: false
}));

//routes
app.use('/', customerRoutes);

//static files
app.use(express.static(path.join(__dirname, "public")));

//stating the server
app.listen(app.get("port"), () => {
    console.log("Server on port 3000")
})