const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
    let steven;

    beforeEach((done) => {
        steven = new User({ name: 'Steven' });
        steven.save()
            .then(() => done());
    });

    it('model instance remove', (done) => {
        steven.remove()
            .then(() => User.findOne({ name: 'Steven'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method remove', (done) => {
        // Remove a bunch of records with some given criteria
        User.remove({ name: 'Steven'})
            .then(() => User.findOne({ name: 'Steven'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findAndRemove', (done) => {
        User.findOneAndRemove({ name: 'Steven'})
            .then(() => User.findOne({ name: 'Steven'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findByIdAndRemove', (done) => {
        // 此處 id 不用轉換為字串
        User.findByIdAndRemove({ _id: steven._id})
            .then(() => User.findOne({ name: 'Steven'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });
});
