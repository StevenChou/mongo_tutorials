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
    // 對應到 mongoDB 裡的 collections[ES6]
    // mongoDB 內的 collections 命名都是小寫的
    const { users, blogposts, comments } = mongoose.connection.collections;
    users.drop(() => {
        blogposts.drop(() => {
            comments.drop(() => {
                // 告訴 mocha 可以開始執行後續的測試任務了(呼叫 done callback)
                done();
            });
        });
    });
});
