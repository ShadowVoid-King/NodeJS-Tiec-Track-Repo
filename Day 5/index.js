// const sum = require("./server.js");
// or
const { x, y } = require("./server.js");
x(2, 3);
y(2, 3);

// const  { createInterface } = require("node:readline");
// i can change createInterface to alias as X

/* 
const  { cInter: createInterface } = require("node:readline");
*/

const readline = require("node:readline");

const { stdin: input, stdout: output } = require("node:process");

// const rl = createInterface({ input, output });
const rl = readline.createInterface({ input, output });

// Check username and password

let username = "Moha";
let pass = "1234";

rl.question("Enter your username: ? ", (username) => {
	// TODO: Log the answer in a database
	if (username === "Moha") {
        console.log("Welcome " + username);
        rl.question("Enter your password: ", (password) => {
        // TODO: Log the answer in a database
        if (password === "1234") {
            console.log("Welcome " + username);
        } else {
            console.log("Wrong password");
        }
        rl.close();
    });
	} else {
		console.log("Wrong username");
    }
    
});

// if (password === pass) {
//         con = false;
//         console.log("Welcome " + username);
//     } else {
//         console.log("Wrong username or password");
//     }

/* 
login page
*/
