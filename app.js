const express = require("express");
const app = express();
const db = require("./data/database");
const path = require("path");
const csrf = require("csurf");

const authRoutes = require("./routes/auth-routes");
const productRoutes = require('./routes/product-routes')
const baseRoutes = require('./routes/base-routes')
const adminRoutes = require('./routes/admin-routes')
const session = require("express-session");
const createSessionConfig = require("./config/session");
const csrfTokenMiddleware = require("./middlewears/csrf-token-middleware");
const CheckAuthMiddleware = require("./middlewears/check-auth-middleware");
const errorHandlerMiddleware = require('./middlewears/error-handler-middleware')

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.static('product-data'))
app.use(express.urlencoded({ extended: true }));

app.use(session(createSessionConfig()));

app.use(csrf());

app.use(csrfTokenMiddleware);
app.use(CheckAuthMiddleware);

app.use('/admin', adminRoutes)
app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);


app.use(errorHandlerMiddleware)

db.connectToDatabase()
    .then(function () {
        app.listen(3000);
    })
    .catch(function (error) {
        console.log("Connection to database was failed!");
        console.log(error);
    });
