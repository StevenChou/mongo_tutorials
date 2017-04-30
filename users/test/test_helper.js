// node import lib
const mongoose = require('mongoose');

// users_test is a target database
mongoose.connect('mongodb://localhost/users_test');

// once and on are event handlers
// watch open event and error event
mongoose.connection
    .once('open',  () => console.log('Good to go!'))
    .on('error', (error) => {
        console.warn('Warning', error);
    });