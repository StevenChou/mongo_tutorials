const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
    it('postCount returns number of posts', (done) => {
        const steven = new User({
            name: 'Steven',
            posts: [{ title: 'PostTitle'}]
        });

        // 0 null undefined
        // steven.postCount;

        steven.save()
            .then(() => User.findOne({ name: 'Steven' }))
            .then((user) => {
                assert(user.postCount === 1);
                done();
            });
    });
});
