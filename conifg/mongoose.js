const mongoose = require('mongoose');
// why localhost because we are using in our system.
mongoose.connect('mongodb://localhost/lecture_database');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to mongoDB"));


db.once('open',function(){
    console.log("Connected to Database");
});