const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const rl = readline.createInterface({ input, output });

rl.question("choose number ", (num) => {
	if (num == 1) {
		console.log("1. New User"); // register
		rl.question("Enter your username: ? ", (username) => {
			rl.question("Enter your password: ", (password) => {
				rl.question("Enter your email: ", (email) => {
					fetch("http://localhost:3000/register", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							username: username,
							password: password,
							email: email,
						}),
					})
                    .then((res) => res.text())  // JSON(), i Change text() to Json DOWN
                    .then((data) => console.log(data))
                    .catch((err) => console.log(err));
                    rl.close(); // close
				});
			});
		});
	} else if (num == 2) {
        console.log("2. Exisiting USer"); // login
        rl.question("Enter your username: ? ", (username) => {
            rl.question("Enter your password: ", (password) => {
                fetch("http://localhost:3000/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    }),
                })
                .then((res) => res.text())
                .then((data) => console.log(data))
                .catch((err) => console.log(err));
                rl.close(); // close
            });
        })
	} else if (num == 3) {
        console.log("3. Get User Data"); // exit
        rl.question("Enter your username: ? ", (username) => {
            fetch(`http://localhost:3000/profile?username=${username}`)
            .then((res) => res.text())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
            rl.close();
        })
	} else if (num == 4) {
		console.log("4. Exit");
		rl.close();
	}
});
