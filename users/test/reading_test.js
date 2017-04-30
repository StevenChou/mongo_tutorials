const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let steven;

    beforeEach((done) => {
        steven = new User({name: 'Steven'});
        steven.save()
            .then(() => done());
    });

    it('finds all users with a name of steven', (done) => {
        User.find({ name: 'Steven' })
            .then((users) => {
                // _id 是一個物件，不是字串
                assert(users[0]._id.toString() === steven._id.toString());
                done();
            });
    });

    it('find a user with a particular name of steven', (done) => {
        // 此處 id 不用轉換為字串
        User.findOne({ _id: steven._id })
            .then((user) => {
                assert(user.name === steven.name);
                done();
            });
    });
});
