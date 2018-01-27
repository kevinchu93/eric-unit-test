const assert = require('assert'); 
const userService = require('../InMemoryUserService');

describe('user', () => {
    const users = [
        { id: 0, name: 'kevin' },
        { id: 1, name: 'eric' },
        { id: 2, name: 'mia' },
];

    describe('.createUser', () => {
        it('should create user with the correct id and name', () => {
            const sut = new userService(users);
            assert.deepEqual(sut.createUser('Jerry'), {id: 3, name: 'Jerry'});
        });
    });

    describe('.getUser', () => {
        it('should return correct user', () => {
            const sut = new userService(users);
            assert.deepEqual(sut.getUser(2), users[2]);
        });
    });

    describe('.getAllUsers', () => {
        it('should return a slice of all users', () => {
            const sut = new userService(users);
            assert.deepEqual(sut.getAllUsers(), users);
        });
    });
    describe('.deleteUser', () => {
        it('should delete correct user', () => {
            const sut = new userService(users);
            sut.deleteUser(2);
            assert.deepEqual(sut.users, [{ id: 0, name: 'kevin' }, { id: 1, name: 'eric' }, {id: 3, name: 'Jerry' }]);
        });
    });
});
