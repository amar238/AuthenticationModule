const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
require("dotenv").config();
const db= require('./middleware/mongoose')
const session = require('express-session');
const passport = require("passport");
const passportLocal = require('./middleware/passport-local-strategy');
const passportGoogle = require('./middleware/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const Session_Secret = process.env.Session_Secret;
app.use(express.json());
app.use(express.static('./assets'));//js files
//view engine
app.set('view engine','ejs'); //use express view engine
app.set('views','./views');//default viws route
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
// storing sessions
app.use(session({
    name : 'CSV',
    secret : Session_Secret,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge : (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongoUrl: db._connectionString,
        autoRemove: 'disabled'
    },(err)=>{console.log(err)}
    )
}));
//Authentication middleware
app.use(passport.initialize());
app.use(passport.session());
// routes
app.use('/',require('./routes/routes.index'));
app.listen(process.env.PORT ,(err)=>{
    if(err){
        console.log(`Error in running server: ${err}`);
    }
    console.log("server is running on port "+process.env.PORT);
});