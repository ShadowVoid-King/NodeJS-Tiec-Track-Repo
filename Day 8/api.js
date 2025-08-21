const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const rl = readline.createInterface({ input, output });

rl.question("What is your name? ", (username) => {
	fetch(`http://localhost:3000/profile?username=${username}&age=99&country=eg`)
		.then((res) => res.json()) // because res has header, body > JSON
		.then((data) => console.log(data)) // write JSON DATA {username: "Moha", password: "1234"}
		.catch((err) => console.log(err)).finally(() => {
            rl.close();
        });
});
