const db = require("../data/database");

async function auth(req, res, next) {
    const userData = req.session.user;
    const isAuth = req.session.isAuth;
    if (!userData || !isAuth) {
        return next();
    }
    const user = await db
        .getDb()
        .collection("users")
        .findOne({ _id: userData.id });
    const isAdmin = user.isAdmin;
    res.locals.isAuth = isAuth;
    res.locals.isAdmin = isAdmin;
    next();
}

module.exports = auth;
