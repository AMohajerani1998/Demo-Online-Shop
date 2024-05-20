function createUserSession(req, user, action){
    req.session.user = {
        id: user.id,
        isAdmin: user.isAdmin
    }
    req.session.save(action)
}

function closeUserSession(req){
    req.session.user = null
}

module.exports = {
    createUserSession : createUserSession,
    closeUserSession : closeUserSession
}