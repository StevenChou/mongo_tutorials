const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
    it('saves a user', () => {
        // 利用 User class 建立 User instance，尚未 insert DB
        const steven = new User({name: 'Steven'});

        // 將建立的 instance 存入 DB
        steven.save();
    });
});