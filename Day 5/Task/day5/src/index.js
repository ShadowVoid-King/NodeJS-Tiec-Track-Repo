// 1. Import the math module
// and use it in the application

const {
	add,
	subtract,
	multiply,
	divide,
	randomInt,
	randomTo50,
} = require("./../lib/math.js");

// TASK 1:
// Make simple calculator app that asks the user for operation to make
// The application will parse the given operation and call the appropriate function
// from the math module.
// The application will then print the result to the console.
// The application will then ask the user if they want to continue.
// If the user wants to continue, the application will repeat the process.
// If the user does not want to continue, the application will exit. //* en.close

// console.log("Test")

const { createInterface } = require("node:readline");

const { stdin: input, stdout: output } = require("node:process");

const rl = createInterface({ input, output });

console.log("TestMe :D"); // test
// function input
function inputQuestion() {
	rl.question(
		"Write Your Calculations: ",
		(calulations) => {
			// it will back as string
			// search by match or search /[+\-*/]/
			// /[+\-*/]/ use \ to escape - so script will not think + to - it will make error
			// indexOf NOT WORK WITH REGEX

			let opera = calulations[calulations.search(/[+\-*/]/)];
			let nums = calulations.trim().split(opera); // split nums [2,3]

			// let opera = calulations[calulations.trim().search(/[+,\-,*,/]/)]; // search by indexof or search [+,-,*,/]

			if (opera == "+") {
				console.log(add(Number(nums[0]), Number(nums[1])));
			} else if (opera == "-") {
				console.log(subtract(Number(nums[0]), Number(nums[1])));
			} else if (opera == "*") {
				console.log(multiply(Number(nums[0]), Number(nums[1])));
			} else if (opera == "/") {
				console.log(divide(Number(nums[0]), Number(nums[1])));
			}

			let Breaker = ["continue", "break", -1, "-1"];
			if (Breaker.includes(calulations)) {
				rl.close();
			}
		} // close call back function
	); // close question
} // close function

inputQuestion();

// TASK 2 (Bouns 50 points):
// Make a guessing game that asks the user to guess a number between 0 and 50.
// The application will generate a random number between 0 and 50 using the randomTo50 function.
// The application will then ask the user to guess the number.
// The user has 5 attempts to guess the number. if the attempt is wrong, the application will print "Try again 🤔" to the console.
// If the user does not guess the number correctly 5 times, the application will print "You lost the game!! try again 🤔" to the console.
// If the user guesses the number correctly, the application will print "You won the game!! congrats 🥳🥳" to the console.

// TASK 3 (Bouns 50 points):
// Make a function that ask the user the following questions:
// 1. What is your name?
// 2. What is your age? (if age is not a number or is less than 10, the application will print "Invalid age" and end the program)
// 3. What is the Favorite programming language
// Then after the user answers all the questions, the application will print the following.
// console.log("\n--- Summary ---");
// console.log(`Name: ${name || "(no name)"}`);
// console.log(`Age: ${age}`);
// console.log(`Favorite language: ${fav || "(not specified)"}`);
// console.log("----------------\n");
