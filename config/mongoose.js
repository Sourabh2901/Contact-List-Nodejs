// Require the library
var mongoose = require('mongoose');

//connected to DB
mongoose.connect('mongodb://localhost/contact_List');

// accuire the connection(to check if it succesfull)
const db = mongoose.connection;

//error
db.on('error',console.error.bind(console , 'error connecting to db'));

//up and running then print the message
db.once('open',function(){
    console.log('succesfully connected to DB');
});