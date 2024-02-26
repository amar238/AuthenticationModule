const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
require("dotenv").config();
const db= require('./middleware/mongoose')






app.use(express.json());
app.use(express.static('./assets'));
//view engine
app.set('view engine','ejs'); //use express view engine
app.set('views','./views');//default viws route
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use('/',require('./routes/routes.index'));

app.listen(process.env.PORT ,(err)=>{
    if(err){
        console.log(`Error in running server: ${err}`);
        
    }
    console.log("server is running on port "+process.env.PORT);
});