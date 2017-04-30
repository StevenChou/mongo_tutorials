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

// 會在所有測試任務之前執行
beforeEach((done) => {
    // 在執行測試前，將 users collection drop 掉 
    mongoose.connection.collections.users.drop(() => {
        // 告訴 mocha 可以開始執行測試任務了(呼叫 done callback)
        done();
    });
});
