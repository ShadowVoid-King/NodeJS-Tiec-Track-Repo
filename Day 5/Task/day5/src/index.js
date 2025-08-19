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
            let result = 0;
                    //~ MULTIPLY     DIVIDE
            for (let o = 0; o < opera.length; o++) {
                if (opera[o] == "*") {
                    result = multiply(Number(nums[o]), Number(nums[o + 1]));
                    nums.splice(o, 2, result); // delete two num and add result
                    opera.splice(o, 1); // delete one opera
                    console.log(nums);
                } else if (opera[o] == "/") {

                    result = divide(Number(nums[o]), Number(nums[o + 1]));
                    nums.splice(o, 2, result); // delete two num and add result
                    opera.splice(o, 1); // delete one opera
                }
                    //~ SUM  Subtract
                for (let i = 0; i < opera.length; i++) {
                    if (opera[i] == "+") {
                        result = add(Number(nums[i]), Number(nums[i + 1]));
                        nums.splice(i, 2, result); // delete two num and add result
                        opera.splice(i, 1); // delete one opera
                    } else if (opera[i] == "-") {
                        result = subtract(Number(nums[i]), Number(nums[i + 1]));
                        nums.splice(i, 2, result); // delete two num and add result
                        opera.splice(i, 1); // delete one opera
                    }
                }
            }
            console.log("Result: ", result);
            inputQuestion(); // DOES WORK ???
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
