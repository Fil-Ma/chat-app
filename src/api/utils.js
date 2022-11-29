"use strict";
import { dictionaryList } from "../languages";

/**
 * Check if a user name is already taken.
 * 
 * @param {String} userName | user name
 * @returns {void|Error} the function does not return nothing
 */
export async function checkUsernameTaken(userName, language = "en") {
    try {
        const urlToFetch = "http://localhost:4000/api/users/" + userName;
        const response = await fetch(urlToFetch);
        
        if (response.status !== 200) {
            throw new Error(dictionaryList[language].api["check-username"])
        }

        return;

    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Check if a room exists already.
 * 
 * @param {String} room 
 * @returns {void|Error} the function does not return nothing
 */
export async function checkRoomExists(room, language = "en") {
    try {
        const urlToFetch = "http://localhost:4000/api/rooms/" + room;
        const response = await fetch(urlToFetch);

        if (response.status !== 200) {
            throw new Error(dictionaryList[language].api["check-room-ifexists"]);
        }

        return;

    } catch(err) {
        throw new Error(err);
    }
}