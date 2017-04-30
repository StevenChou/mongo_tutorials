const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
    let steven;

    beforeEach((done) => {
        steven = new User({name: 'Steven'});
        steven.save()
            .then(() => done());
    });

    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Alex');
                done();
            });
    }

    it('instance type using set n save', (done) => {
        // 只更新 instance 的值，並沒有更新資料庫
        steven.set('name', 'Alex');
        // 更新 DB data
        assertName(steven.save(), done);              
    });

    it('A model instance can update', (done) => {
        // ** 直接更新至資料庫，但 name 並未更新(name ===> Steven)
        assertName(steven.update({ name: 'Alex' }), done);
    });

    it('A model class can update', (done) => {
        // Update a bunch of records with some given criteria
        assertName(
            User.update({ name: 'Steven' }, { name: 'Alex' }),
            done);
    });

    it('A model class can update one record', (done) => {
        assertName(
            User.findOneAndUpdate({ name: 'Steven' }, { name: 'Alex' }),
            done);
    });

    it('A model class can find a record with an Id and update', (done) => {
        assertName(
            User.findByIdAndUpdate(steven._id, { name: 'Alex' }),
            done);
    });
});
