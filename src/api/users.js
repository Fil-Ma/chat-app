"use strict";

export async function checkUsernameTaken(userName) {
    try {
        const urlToFetch = "http://localhost:4000/api/" + userName;

        const response = await fetch(urlToFetch);
        const data = await response.json();

        return data;

    } catch (err) {
        throw new Error(err);
    }
}