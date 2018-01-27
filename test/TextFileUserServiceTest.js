const assert = require('assert'); 
const userService = require('../TextFileUserService');
const sinon = require('sinon');
const fs = require('fs');

describe('user', () => {
    const users = [
        { id: 0, name: 'Mia' },
        { id: 1, name: 'Eric' },
        { id: 2, name: 'Kevin' },
];

    const name = 'Jerry';

    describe('.createUser', () => {
        it('should create user with the correct id and name', () => {
            var stub = sinon.stub(fs, 'appendFileSync');
            const sut = new userService(users);
            sut.createUser(name);
            stub.restore();
            sinon.assert.calledWith(stub, 'Users.txt', '3 ' + name + '\n', 'utf8');
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
            var stub = sinon.stub(fs, 'writeFileSync');
            const sut = new userService(users);
            sut.deleteUser(2);
            sinon.assert.calledWith(stub, 'Users.txt', `${users[0].id} ${users[0].name}\n${users[1].id} ${users[1].name}\n`, 'utf8');
        });
    });
});
