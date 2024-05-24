function notFoundErrorHandler(req, res, next){
    res.status(404).render('shared/404')
}

module.exports = notFoundErrorHandler;