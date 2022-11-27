const users = [];

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

function removeUser(id) {
    const userIndex = users.indexOf((user) => user.id === id);
    const user = users[userIndex];

    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        return user;
    }
    return null;
}

function getUser(id) {
    const user = users.find((element) => element.id === id);
    return user;
}

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