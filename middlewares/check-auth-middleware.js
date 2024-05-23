async function auth(req, res, next) {
    const userData = req.session.user;
    if (!userData) {
        res.locals.isAuth = false;
        return next();
    }
    const isAdmin = userData.isAdmin;
    res.locals.userId = userData.id
    res.locals.isAuth = true;
    res.locals.isAdmin = isAdmin;
    next();
}

module.exports = auth;
