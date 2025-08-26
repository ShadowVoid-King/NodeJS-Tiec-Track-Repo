const fs = require("fs");

/**
 * Load users from JSON file named "data/users.json"
 *
 * @param {string} dbFile
 *     This is the path to the json file
 */
function loadUsers(users, dbFile) {
    // const dbFile = "data/users.json";
    if (fs.existsSync(dbFile)) {
        // Return Boolean
        // Returns true if the path exists, false otherwise.
        const data = fs.readFileSync(dbFile, "utf8");
        const parsedData = JSON.parse(data); // parse to JSON
        users.length = 0; // Clear Array
        users.push(...parsedData); // Make A Spread Syntex
    } else {
        console.error(`Database file ${dbFile} does not exist.`);
    }
}

/**
 * Save users to JSON file named "data/users.json"
 *
 * @param {string} dbFile
 *     This is the path to the json file
 */
function saveUsers(users, dbFile) {
    // const dbFile = "data/users.json";
    if (fs.existsSync(dbFile)) {
        const data = JSON.stringify(users); // Convert to JSON String
        fs.writeFileSync(dbFile, data, "utf8"); // Write to file
        console.log(`Users saved to ${dbFile}`);
    } else {
        console.log(`Database file ${dbFile} does not exist.`);
    }
}

/**
 * This function will save logged in user to a file named "data/loggedInUser.json"
 *
 * @param {{username: string, email: string, role: 'ADMIN' | 'USER'}} user
 *     This is the user object that will be saved to the file
 */
function saveLoggedInUser(user, dbFile) {
    // const dbFile = "data/loggedInUser.json";
        const data = JSON.stringify(user || {}); // Convert to JSON String
        fs.writeFileSync(dbFile, data, "utf8"); // Write to file
        console.log(`Logged in user saved to ${dbFile}`);
}

/**
 * This function will load logged in user from a file named "data/loggedInUser.json"
 * if file does not exist or file is empty it will return null
 *
 * @returns {{username: string, email: string, role: 'ADMIN' | 'USER'} | null} user
 *     This is the user object that will be loaded from the file or null
 *     if file does not exist or file is empty
 */
function loadLoggedInUser(dbFile) {
    // const dbFile = "data/loggedInUser.json";
    if (fs.existsSync(dbFile)) {
        const data = fs.readFileSync(dbFile, "utf8");
        if (data) {
            parsedData = JSON.parse(data); // parse to JSON
            return parsedData;
        } else {
            return console.log(`Database file ${dbFile} is empty.`);
        }
    } else {
        return console.log(`Database file ${dbFile} does not exist.`);
    }
}


module.exports = {
    loadUsers,
    saveUsers,
    saveLoggedInUser,
    loadLoggedInUser
}