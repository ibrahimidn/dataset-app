const express = require('express')
require('./src/db/mongoose')
const fileUpload=require('express-fileupload')
const app = express()
const flash = require('connect-flash');
//Use json to parser requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
//Passport config
const session = require('express-session')
app.use(session({
    secret: 'secret session',
    resave: false,
    saveUninitialized: true
}))

app.use(flash())
const passport = require('passport')
require('./src/config/auth')(passport)
app.use(passport.initialize())
app.use(passport.session())

//Initializing Express engine to ejs

app.set('view engine', 'pug')


// Setup static directory to serve
const path = require('path')
const publicDirectoryPath = path.join(__dirname, './public')
app.use(express.static(publicDirectoryPath))

app.use(function (req, res, next) {

    res.locals.user = req.user || null
    console.log(res.locals.user)
    next();
});

//Initializing app rRuters
const indexRouter = require('./src/routes/index')
const userRouter = require('./src/routes/user')
const datasetRouter = require('./src/routes/dataset')
app.use('/', indexRouter)
app.use('/users/', userRouter)
app.use('/dataset/', datasetRouter)
//App listener
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server is up on port: ' + port)
})

