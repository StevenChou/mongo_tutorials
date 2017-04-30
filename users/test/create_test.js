const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
    it('saves a user', (done) => {
        // 利用 User class 建立 User instance，尚未 insert DB
        const steven = new User({name: 'Steven'});

        // 將建立的 instance 存入 DB
        steven.save()
            .then(() => {
                // Has steven been saved successfully
                assert(!steven.isNew);

                // 當 assert return false，就不會往下執行 done()
                done();
            });
    });
});
