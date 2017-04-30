// node import lib
const mongoose = require('mongoose');

// 使用 ES6 實作的 Promise
mongoose.Promise = global.Promise;

// 在測試過程中，只會執行一次
before((done) => {
    // users_test is a target database
    mongoose.connect('mongodb://localhost/users_test');

    // once and on are event handlers
    // watch open event and error event
    mongoose.connection
        .once('open',  () => { done(); })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});


// 會在所有測試任務之前執行
beforeEach((done) => {
    // 在執行測試前，將 users collection drop 掉 
    mongoose.connection.collections.users.drop(() => {
        // 告訴 mocha 可以開始執行測試任務了(呼叫 done callback)
        done();
    });
});
