const users = [];

/**
 * Adds a user to "database"
 * 
 * @param {Object} userData | id: user.id, name: username, room to join 
 * @returns {Object|Error} returns the user that has been added
 */
function addUser({ id, name, room}) {
    name.trim().toLowerCase();
    room.trim().toLowerCase();

    if (users.find((user) => user.room === room && user.name === name)) {
        throw new Error("user already exists")
    }

    const user = { id, name, room };
    users.push(user);
    return user;
}

/**
 * Removes user on disconnect
 * 
 * @param {String} id | user id 
 * @returns {Object|null} returns user if found
 */
function removeUser(id) {
    const userIndex = users.indexOf((user) => user.id === id);
    const user = users[userIndex];

    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        return user;
    }
    return null;
}

/**
 * Retrieve user from "database"
 * 
 * @param {String} id 
 * @returns {Object} the user in database
 */
function getUser(id) {
    const user = users.find((element) => element.id === id);
    return user;
}

/**
 * Retrieve all the user in one room
 * 
 * @param {String} room 
 * @returns {Array} array of user object that are in one room
 */
function getUsersInRoom(room) {
    const usersInRoom = users.filter((user) => user.room === room);
    return usersInRoom;
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}