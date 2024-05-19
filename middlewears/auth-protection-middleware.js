function guardRoute(req, res, next) {
    if (!res.locals.isAuth) {
        res.redirect("/401");
    }
    next();
}

module.exports = guardRoute;
