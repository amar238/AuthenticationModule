const mongoose = require('mongoose');

var Username = encodeURIComponent(process.env.user);
var Password = encodeURIComponent(process.env.password);
var DB = encodeURIComponent(process.env.mongoDB);
mongoose.set('strictQuery',false);

// mongoDB address
mongoose.connect(`mongodb+srv://${Username}:${Password}@${DB}`);

// mongoose.connect('mongodb://localhost:27017/Authentication');

const db = mongoose.connection;
db.on('error',console.error.bind(console,"Error in connceting db"));
db.once('open',()=>{
    console.log(db._connectionString);
})

module.exports = db;
