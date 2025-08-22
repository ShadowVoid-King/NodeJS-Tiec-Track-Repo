/**
 * ! +50 bonus points
 * Load users from JSON file
 *
 * https://nodejs.org/api/fs.html#fsreadfilesyncpath-options
 *
 * @param {string} dbFile
 *     This is the path to the json file
 */
const fs = require("fs"); // File System For Read and Write ( it will be Like DataBase )

/* 
Use async in servers > readFile , writeFile
Use sync in scripts  > readFileSync , writeFileSync

each one need to be fs.

existsSync is deprecated, but often used.
*/

function loadUsers(users, dbFile) {
	if (fs.existsSync(dbFile)) {
		// Returns true if the path exists, false otherwise.
		const data = fs.readFileSync(dbFile, "utf8");
		const parsedData = JSON.parse(data); // parse to JSON
		users.push(...parsedData); // Make A Spread Syntex
	} else {
		console.error(`Database file ${dbFile} does not exist.`);
	}
}

/**
 * Load tasks from JSON file
 *
 * @param {string} dbFile
 *     This is the path to the json file
 */
function loadTasks(tasks, dbFile) {
	if (fs.existsSync(dbFile)) {
		const data = fs.readFileSync(dbFile, "utf8");
		const parsedData = JSON.parse(data);
		tasks.push(...parsedData);
	} else {
		console.error(`Database file ${dbFile} does not exist.`);
	}
}

/**
 * Save tasks to JSON file
 *
 * @param {string} dbFile
 *     This is the path to the json file
 */
function saveTasks(tasks, dbFile) {
    if (fs.existsSync(dbFile)) {
        const data = JSON.stringify(tasks, null, 2); // Convert to JSON String
        fs.writeFileSync(dbFile, data, "utf8"); // Write to file
        console.log(`Tasks saved to ${dbFile}`);
    } else {
        console.log(`Database file ${dbFile} does not exist.`);
    }
}

/**
 * Save users to JSON file
 *
 * @param {string} dbFile
 *     This is the path to the json file
 */
function saveUsers(users, dbFile) {

}

module.exports = {
	loadUsers,
	loadTasks,
	saveTasks,
	saveUsers,
};
