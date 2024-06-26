const express = require("express");
const app = express();
const db = require("./data/database");
const path = require("path");
const csrf = require("csurf");

const authRoutes = require("./routes/auth-routes");
const productRoutes = require('./routes/product-routes')
const baseRoutes = require('./routes/base-routes')
const adminRoutes = require('./routes/admin-routes')
const cartRoutes = require('./routes/cart-routes')
const orderRoutes = require('./routes/order-routes')
const session = require("express-session");
const createSessionConfig = require("./config/session");
const csrfTokenMiddleware = require("./middlewares/csrf-token-middleware");
const CheckAuthMiddleware = require("./middlewares/check-auth-middleware");
const routeProtectionMiddleware = require('./middlewares/route-protection-middleware')
const errorHandlerMiddleware = require('./middlewares/error-handler-middleware')
const cartPricesUpdateMiddleware = require('./middlewares/cart-prices-update-middleware')
const notFoundErrorHandlerMiddleware = require('./middlewares/not-found-middleware')

let port = 3000
if (process.env.PORT){
    port = process.env.PORT
}

const initializeCart = require('./middlewares/cart-middleware')

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use('/products/assets', express.static('product-data'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(session(createSessionConfig()));

app.use(csrf());

app.use(initializeCart)
app.use(cartPricesUpdateMiddleware)

app.use(csrfTokenMiddleware);
app.use(CheckAuthMiddleware);
app.use(baseRoutes);
app.use(productRoutes);
app.use('/cart', cartRoutes)
app.use(authRoutes);

app.use('/orders', routeProtectionMiddleware, orderRoutes)
app.use('/admin', routeProtectionMiddleware, adminRoutes)

app.use(notFoundErrorHandlerMiddleware)

app.use(errorHandlerMiddleware)

db.connectToDatabase()
    .then(function () {
        app.listen(port);
    })
    .catch(function (error) {
        console.log("Connection to database was failed!");
        console.log(error);
    });
