/**
 * Load tasks from JSON file named "data/tasks.json"
 *
 * @param {string} dbFile
 *     This is the path to the json file
 */
function loadTasks(tasks) {
        if (fs.existsSync(dbFile)) {
            const data = fs.readFileSync(dbFile, "utf8");
            const parsedData = JSON.parse(data);
            tasks.push(...parsedData);
        } else {
            console.error(`Database file ${dbFile} does not exist.`);
        }

}

/**
 * Save tasks to JSON file named "data/tasks.json"
 *
 * @param {string} dbFile
 *     This is the path to the json file
 */
function saveTasks(tasks) {
        if (fs.existsSync(dbFile)) {
            const data = JSON.stringify(tasks); // Convert to JSON String
            fs.writeFileSync(dbFile, data, "utf8"); // Write to file
            console.log(`Tasks saved to ${dbFile}`);
        } else {
            console.log(`Database file ${dbFile} does not exist.`);
        }
}

/**
 * Load users from JSON file named "data/users.json"
 *
 * @param {string} dbFile
 *     This is the path to the json file
 */
function loadUsers(users) {
        if (fs.existsSync(dbFile)) { // Return Boolean
            // Returns true if the path exists, false otherwise.
            const data = fs.readFileSync(dbFile, "utf8");
            const parsedData = JSON.parse(data); // parse to JSON
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
function saveUsers(users) {
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
function saveLoggedInUser(user) {
    const dbFile = "data/loggedInUser.json";
    if (fs.existsSync(dbFile)) {
        const data = JSON.stringify(user); // Convert to JSON String
        fs.writeFileSync(dbFile, data, "utf8"); // Write to file
        console.log(`Logged in user saved to ${dbFile}`);
    } else {
        console.log(`Database file ${dbFile} does not exist.`);
    }
}

/**
 * This function will load logged in user from a file named "data/loggedInUser.json"
 * if file does not exist or file is empty it will return null
 *
 * @returns {{username: string, email: string, role: 'ADMIN' | 'USER'} | null} user
 *     This is the user object that will be loaded from the file or null
 *     if file does not exist or file is empty
 */
function loadLoggedInUser() {
    const dbFile = "data/loggedInUser.json";
    if (fs.existsSync(dbFile)) {
        const data = fs.readFileSync(dbFile, "utf8");
        if (data) {
            return parsedData = JSON.parse(data); // parse to JSON
        } else {
            console.log(`Database file ${dbFile} is empty.`);
        }
    } else {
        return console.log(`Database file ${dbFile} does not exist.`);
    }
}
