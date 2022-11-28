"use strict";

export async function checkUsernameTaken(userName) {
    try {
        const urlToFetch = "http://localhost:4000/api/" + userName;

        const response = await fetch(urlToFetch);
        
        if (response.status !== 200) {
            throw new Error("Whoops! Something went wrong, please try again")
        }

        return;

    } catch (err) {
        throw new Error(err);
    }
}