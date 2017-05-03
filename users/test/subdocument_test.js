const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
    it('can create a subdocument', (done) => {
        const steven = new User({
             name: 'Steven', posts: [{ title: 'PostTitle' }]
        });

        steven.save()
            .then(() => User.findOne({ name: 'Steven' }))
            .then((user) => {
                assert(user.posts[0].title === 'PostTitle');
                done();
            });
    });


    it('can add subdocuments to an existing record', (done) => {
        const steven = new User({
             name: 'Steven', posts: []
        });

        // promise chain
        steven.save()
            .then(() => User.findOne({ name: 'Steven' }))
            .then((user) => {
                user.posts.push({ title: 'New Post' });
                // return promise obj
                return user.save();
            })
            .then(() => User.findOne({ name: 'Steven' }))
            .then((user) => {
                assert(user.posts[0].title === 'New Post');
                done();
            });
    });
});
