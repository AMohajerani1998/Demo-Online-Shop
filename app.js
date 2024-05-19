const express = require('express')
const app = express();
const db = require('./data/database')
const path = require('path')
const csrf = require('csurf')

const authRoutes = require('./routes/auth')
const session = require('express-session')
const sessionConfig = require('./config/session')


const csrfTokenMiddleware = require('./middlewears/csrf-token-middleware')
const authMiddleware = require('./middlewears/auth-middleware')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

const mongoDBStore = sessionConfig.createSessionStore(session)
app.use(session(sessionConfig.createSessionConfig(mongoDBStore)))

app.use(csrf())


app.use(csrfTokenMiddleware)
app.use(authMiddleware)

app.use(authRoutes)


db.connectToDatabase().then(function(){
    app.listen(3000)
})