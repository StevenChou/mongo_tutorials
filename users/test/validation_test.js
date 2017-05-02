const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
    // 因為都是同步處理，所以不需要加 done callback method
    it('Requires a user name', () => {
        const user = new User({ name: undefined });
        // 同步處理(沒有 call back method) 也有非同步的 validate()
        const validationResult = user.validateSync();
        // console.log(validationResult);
        const { message } = validationResult.errors.name;

        assert(message === 'Name is required.');
    });

    it('requires a user\'s name longer than 2 characters', () => {
        const user = new User({ name: 'al' });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert(message === 'Name must be longer than 2 characters');
    });
});
