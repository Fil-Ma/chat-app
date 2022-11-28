"use strict";

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
        room.trim().toLowerCase();

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
        const index = this.users.find((user) => {
            user.id === id
        });
     
        if(index !== -1) {
            return this.users.splice(index,1)[0];
        }
    }

    /**
     * Retrieve user from "database"
     * 
     * @param {String} id | user id
     * @returns {Object|null} the user in database
     */
    getUserById(id) {
        const user = this.users.find((element) => element.id === id);
        if (user) return user;
        return null;
    }

    /**
     * Retrieve user from "database"
     * 
     * @param {String} name | user name
     * @returns {Object|null} the user in database
     */
     getUserByName(name) {
        const user = this.users.find((element) => element.name === name);
        if (user) return user;
        return null;
    }

    /**
     * Retrieve all the user in one room
     * 
     * @param {Number} room 
     * @returns {Array} array of user object that are in one room
     */
    getUsersInRoom(room) {
        const usersInRoom = this.users.filter((user) => user.room === room);
        return usersInRoom;
    }

    /**
     * Retrieve a room if it exists in database
     * 
     * @param {String} room | room number
     * @returns {Object|null} the room in database
     */
     checkIfRoomExists(room) {
        const roomInDb = this.users.find((element) => element.room === room);
        if (roomInDb) return roomInDb;
        return null;
    }
    
}
