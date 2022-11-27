
module.exports = class UserService {
    constructor() {
        this.users = [];
    }

    /**
     * Adds a user to "database"
     * 
     * @param {Object} userData | id: user.id, name: username, room to join 
     * @returns {Object|null} returns the user that has been added
     */
    addUser({ id, name, room}) {
        name.trim().toLowerCase();

        if (this.users.find((user) => user.room === room && user.name === name)) {
            return null;
        }
        
        const user = { id, name, room };
        this.users.push(user);
        return user;
    }

    /**
     * Removes user on disconnect
     * 
     * @param {String} id | user id 
     * @returns {Object|null} returns user if found
     */
    removeUser(id) {
        const userIndex = this.users.indexOf((user) => user.id === id);
        const user = this.users[userIndex];

        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
            return user;
        }
        return null;
    }

    /**
     * Retrieve user from "database"
     * 
     * @param {String} id 
     * @returns {Object|null} the user in database
     */
    getUser(id) {
        const user = this.users.find((element) => element.id === id);
        if (user) return user;
        return null;
    }

    /**
     * Retrieve all the user in one room
     * 
     * @param {String} room 
     * @returns {Array} array of user object that are in one room
     */
    getUsersInRoom(room) {
        const usersInRoom = this.users.filter((user) => user.room === room);
        return usersInRoom;
    }
}
