const fs = require('fs');

const User = require('./User.js');

// An implementation of UserService that stores data in User.txt
class TextFileUserService
{
    constructor()
    {
        this.users = [];
    }

    createUser(name)
    {
        const users = this.getAllUsers();
        const lastUser = users[users.length - 1];
        const id = lastUser ? lastUser.id + 1 : 0;
        const user = new User(id, name);
        fs.appendFileSync('Users.txt', `${user.id} ${user.name}\n`, 'utf8');
        return user;
    }

    getUser(id)
    {
        const users = this.getAllUsers();
        for (let i = 0; i < users.length; i++)
        {
            const user = users[i];
            if (user.id === id)
                return user;
        }
        return null;
    }

    getAllUsers()
    {
        const data = fs.readFileSync('Users.txt', 'utf8');
        const lines = data.split(/[\r\n]+/);
        const users = [];
        for (let i = 0; i < lines.length; i++)
        {
            const line = lines[i];
            if (line)
            {
                const id = parseInt(line.substring(0, line.indexOf(' ')));
                const name = line.substring(line.indexOf(' ') + 1);
                const user = new User(id, name);
                users.push(user);
            }
        }
        return users;
    }

    deleteUser(id)
    {
        const users = this.getAllUsers();
        const data = [];
        for (let i = 0; i < users.length; i++)
        {
            const user = users[i];
            if (user.id !== id)
                data.push(`${user.id} ${user.name}\n`);
        }
        fs.writeFileSync('Users.txt', data.join(''), 'utf8');
    }
}

module.exports = TextFileUserService;
