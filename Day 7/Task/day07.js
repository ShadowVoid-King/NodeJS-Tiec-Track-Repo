// create a function that resolves after 1 second
function delayValue(value, ms) {
	return new Promise((resolve) => {
		resolve(`Value = ${value}`); // not work here
	})
		.then((res) => {
			setTimeout(() => {
				console.log(res);
			}, ms); // timeout after 1 second
		})
		.catch((err) => {
			console.log(err);
		});
}
// delayValue(100, 1000);

// create a function that rejects after 1 second
function delayFail(value, ms) {
	return new Promise((resolve) => {
		resolve(`Value = ${value}`); // not work here
	})
		.then((res) => {
			setTimeout(() => {
				console.log(res);
			}, ms); // timeout after 1 second
		})
		.catch((err) => {
			console.log(err);
		});
}

// Task 2 — promisifyQuestion(rl, question)
// Wrap readline.question into a Promise that resolves with the
// user's trimmed answer, or rejects if something goes wrong.
// (No async/await; use new Promise + rl.question)

const readline = require("node:readline"); // readline
const { stdin: input, stdout: output } = require("node:process");
rl = readline.createInterface({ input, output });

function promisifyQuestion(rl, question) {
	return new Promise((resolve, reject) => {
		rl.question(question, (answer) => {
			if (answer === "") {
				reject("Null Name");
			} else {
				resolve(answer.trim());
			}
			rl.close();
		});
	});
}

promisifyQuestion(rl, "What is your name? ")
	.then((name) => {
		console.log(`Your name is ${name}`);
		delayValue(100, 1000);
	})
	.catch((err) => {
		console.error(err);
		delayFail(-100, 1000);
	});
