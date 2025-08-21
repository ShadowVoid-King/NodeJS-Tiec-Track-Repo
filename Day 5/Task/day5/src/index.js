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

console.log("Task 1 :"); // test
// function input
function inputQuestion() {
	console.log("\n--- Task 1 ---");
	rl.question(
		"Write Your Calculations: ",
		(calulations) => {
			// calulations > it will back as string
			//* Breaker
			let Breaker = ["continue", "cut", "break", "-1", "done", "no"];
			if (Breaker.includes(calulations.toLowerCase())) {
				// in case if i write Upper Case
				rl.close();
				return; // it will stop whole function ( exit || no infinite loop )
			}
			// search by match or search /[+\-*/]/
			// /[+\-*/]/ use \ to escape - so script will not think + to - it will make error
			//* indexOf NOT WORK WITH REGEX
			// let opera = calulations[calulations.search(/[+\-*/]/)];
			let opera = calulations.trim().match(/[+\-*/]/g); // g for global flag
			//? work with only one operation but not with mutli opeartion (with no spcae, it work is there is space)
			let nums = calulations.trim().match(/\d+\.?\d*/g); // split nums [2,3]

			// let opera = calulations[calulations.trim().search(/[+,\-,*,/]/)]; // search by indexof or search [+,-,*,/]
			//* if wrong operation
			if (opera == "-1") {
				// idk if back string or number , if fail
				console.log("There Is No Operation");
			}
			// 2 + 2 + 2
			let result;
			//~ MULTIPLY     DIVIDE
			for (let o = 0; o < opera.length; o++) {
				if (opera[o] == "*") {
					result = multiply(Number(nums[o]), Number(nums[o + 1]));
					nums.splice(o, 2, result); // delete two num and add result
					opera.splice(o, 1); // delete one opera
					console.log(nums); // delete
					o = -1;
				} else if (opera[o] == "/") {
					result = divide(Number(nums[o]), Number(nums[o + 1]));
					nums.splice(o, 2, result); // delete two num and add result
					opera.splice(o, 1); // delete one opera
					o = -1;
				}
			}

			let finResult = Number(nums[0]); // to be first index
			//~ SUM  Subtract
			for (let i = 0; i <= opera.length; i++) {
				if (opera[i] == "+") {
					finResult = add(finResult, Number(nums[i + 1]));
					console.log(nums, opera[i]); // delete
				} else if (opera[i] == "-") {
					finResult = subtract(finResult, Number(nums[i + 1]));
					console.log(nums); // delete
				}
			}
			console.log("Result: ", finResult);
			inputQuestion(); // DOES WORK ???
		} // close call back function
	); // close question
} // close function

// inputQuestion();

// TASK 2 (Bouns 50 points):
// Make a guessing game that asks the user to guess a number between 0 and 50.
// The application will generate a random number between 0 and 50 using the randomTo50 function.
// The application will then ask the user to guess the number.
// The user has 5 attempts to guess the number. if the attempt is wrong, the application will print "Try again 🤔" to the console.
// If the user does not guess the number correctly 5 times, the application will print "You lost the game!! try again 🤔" to the console.
// If the user guesses the number correctly, the application will print "You won the game!! congrats 🥳🥳" to the console.

console.log("guessing game a number between 1 and 50\n");
let count = 0;
let guessMe = randomTo50(); // random 1 to 50

function guessGame() {
	rl.question("guess the number : ", (req) => {
		requestNum = Number(req); // string to num
		console.log("Debug", guessMe, requestNum, "\n");
		if (requestNum !== guessMe) {
			console.log("Try again 🤔");
			count++;
			guessGame();
		} else if (requestNum === guessMe) {
			console.log("You won the game!! congrats 🥳🥳");
			rl.close();
		}
		if (count === 5) {
			console.log("You lost the game!! try again 🤔");
			rl.close();
		}
	});
}
// guessGame();

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

rl.question("What is your name? ", (name) => {
	rl.question("What is your age? ", (age) => {
		if (age < 10) {
			console.log("Invalid age");
			rl.close();
		} else {
			rl.question("What is your favorite programming language? ", (fav) => {
				console.log("\n--- Summary ---");
				console.log(`Name: ${name || "(no name)"}`);
				console.log(`Age: ${age}`);
				console.log(`Favorite language: ${fav || "(not specified)"}`);
				console.log("----------------\n");
				rl.close();
			});
		}
	});
});


/* TASK 1: - TEMP
let op = ["+", "-", "*", "/"];
let num = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
let text = "5+5+5*2/10";
let NumArr = [];
let opArr = [];
let check = ''
// parse nums, op
for (let i of text) {
    if (op.includes(i)) {
        opArr.push(i);
        NumArr.push(Number(check));
        check = ""
    } else if (num.includes(i)) {
        check += i
    }
}
NumArr.push(Number(check));
console.log(NumArr);
console.log(opArr);
let result = 0;

if (opArr.length > 0) {
    for (let i = 0; i <= opArr.length; i++) {
        console.log(opArr, i, NumArr)
        if (opArr.length === i) { // if last index
            i = i - 1;
        }
        if (opArr[i] == "*") {
            result = multiply(NumArr[i], NumArr[i + 1]);
            NumArr.splice(i, 2, result); // delete two num and add result
            opArr.splice(i, 1); // delete one opera
        } else if (opArr[i] == "/") {
            result = divide(NumArr[i], NumArr[i + 1]);
            NumArr.splice(i, 2, result); // delete two num and add result
            opArr.splice(i, 1); // delete one opera
        }
        else if (opArr[i] == "+") {
            result = add(NumArr[i], NumArr[i + 1]);
            NumArr.splice(i, 2, result); // delete two num and add result
            opArr.splice(i, 1); // delete one opera
        } else if (opArr[i] == "-") {
            result = subtract(NumArr[i], NumArr[i + 1]);
            NumArr.splice(i, 2, result); // delete two num and add result
            opArr.splice(i, 1); // delete one opera
        }
        console.log(opArr, i, NumArr)

    }
}
console.log(result);

*/
