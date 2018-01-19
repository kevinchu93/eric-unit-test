const User = require('./User.js');

class InMemoryUserService
{
    constructor()
    {
        this.users = [];
    }

    createUser(name)
    {
        const lastUser = this.users[this.users.length - 1];
        const id = lastUser ? lastUser.id + 1 : 0;
        const user = new User(id, name);
        this.users.push(user);
        return user;
    }

    getUser(id)
    {
        for (let i = 0; i < this.users.length; i++)
        {
            const user = this.users[i];
            if (user.id === id)
                return user;
        }
        return null;
    }

    getAllUsers()
    {
        // Make a copy to prevent external mutation
        return this.users.slice();
    }

    deleteUser(id)
    {
        this.users.filter(u => u.id != id);
    }
}

module.exports = InMemoryUserService;
