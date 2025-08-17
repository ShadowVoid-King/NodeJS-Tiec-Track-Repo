// ------------------------------
//// Task 1 — Array warm‑up (no loops)
// ------------------------------
console.log("\\nTask 1 — Array warm‑up");
let people = ["Adam", "Mia", "Jamal", "Sara", "Omar", "Nina"];

// 1) Remove the person at the FRONT who decided to leave.
people.shift(0); // Adam
// 2) Add "Luna" to the VERY FRONT.
people.unshift("Luna");
// 3) Move the LAST TWO people to be right AFTER the first element (keep their order).
let deletedPeople = people.splice(1, 3); //* Deleted Persons
let addRemovePoeple = people.push(deletedPeople); //* push not reflect  data but reflect  length of it
people = people.flat(); //* Flatten the array to remove nested arrays because it'n change parent array
// console.log(deletedPeople) // (3) ['Mia', 'Jamal', 'Sara']
// console.log(addRemovePoeple) show as array
/*
~ i can use splice as snacky way 
~ delete last two, paste them in any index but the idea is don't delete as splice(1, 0, Put Last Two Var)
~  it was good tip
*/
console.log("people =", people); // ["Luna", "Omar", "Nina", "Mia", "Jamal", "Sara"]

// ------------------------------
//// Task 2 — Small decisions with logical operators
// ------------------------------
console.log("\\nTask 2 — Decisions with && and ||");
let a = 12;
let b = 5;
let c = 0;

// Create a variable 'isNiceNumber' that is TRUE only if:
//   - a is even AND b is odd OR c is NOT truthy (use !c)
// Use &&, ||, and !
let isNiceNumber;
//* !c > mean Check (C) is not false
(a % 2 == 0 && b % 2 == 1) || !c
	? (isNiceNumber = true)
	: (isNiceNumber = false);

console.log("isNiceNumber =", isNiceNumber); // true

// ------------------------------
//// Task 3 — Array membership without loops
// ------------------------------
console.log("\\nTask 3 — Array membership without loops");
let cartA = ["Phone", "Headphones", "Charger"];
let cartB = ["Laptop", "Camera"];

// Create 'hasTechDeal' that is TRUE if EITHER cart contains "Laptop" OR "Camera".
// Use includes or indexOf (no loops).

// Another Way
// let hasTechDeal =
// 	cartA.includes(cartB[0]) || cartA.includes(cartB[1])
// 	&&
// 	cartB.includes(cartB[0]) || cartB.includes(cartB[1]);

let hasTechDeal = cartA.includes(cartB[0]) || cartA.includes(cartB[1])

console.log("hasTechDeal =", hasTechDeal); // true

hasTechDeal = cartB.includes(cartB[0]) || cartB.includes(cartB[1]);

console.log("hasTechDeal =", hasTechDeal); // true

// ------------------------------
//// Task 4 — Truthy vs Falsy (no loops)
// ------------------------------
console.log("\\nTask 4 — Truthy vs Falsy");
let values = [0, "hi", "", 42, null]; //* Note Null is equal to false - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null

// Create two arrays: truthy and falsy. Then, using if/else for EACH element by index,
// push the value into the correct array. Use the logical NOT operator to test falsy.
let truthy = [];
let falsy = [];

// value at index 0
// if value is falsy, push it to falsy array
// if value is truthy, push it to truthy array

if (!values[0]) {
	falsy.push(values[0]);
} else {
	truthy.push(values[0]);
}
// value at index 1
// if value is falsy, push it to falsy array
// if value is truthy, push it to truthy array
if (!values[1]) {
	falsy.push(values[1]);
} else {
	truthy.push(values[1]);
}
// value at index 2
// if value is falsy, push it to falsy array
// if value is truthy, push it to truthy array
if (!values[2]) {
	falsy.push(values[2]);
} else {
	truthy.push(values[2]);
}
// value at index 3
// if value is falsy, push it to falsy array
// if value is truthy, push it to truthy array
if (!values[3]) {
	falsy.push(values[3]);
} else {
	truthy.push(values[3]);
}
// value at index 4
// if value is falsy, push it to falsy array
// if value is truthy, push it to truthy array
if (!values[4]) {
	falsy.push(values[4]);
} else {
	truthy.push(values[4]);
}

console.log("truthy =", truthy);
console.log("falsy  =", falsy);

// ------------------------------
//// Task 5 — Merge settings (Object.assign) WITHOUT changing defaults
// ------------------------------
/* 
~ The Object.assign() static method copies all enumerable own properties from one or more source objects to a target object. It returns the modified target object.
*/

console.log("\\nTask 5 — Object.assign merge");
let defaults = { theme: "light", pageSize: 20, showTips: true };
let overrides = { theme: "", pageSize: 50 }; // falsy value "" should still override

// Create 'settings' as a MERGE of defaults and overrides WITHOUT mutating 'defaults'.
// Use Object.assign on an empty object or a shallow copy of defaults.
let settings;

//? if i don't write {} it will overwrite the defaults (Parent)
//* {} Create A new Object than change in parent object

settings = Object.assign({}, defaults, overrides);

console.log("settings =", settings);
console.log("defaults still =", defaults);

// ------------------------------
//// Task 6 — Prototypes with Object.create (no functions needed)
// ------------------------------
console.log("\\nTask 6 — Object.create basics");
let vehicleBase = {
	type: "vehicle",
	wheels: 0,
	powered: true,
};

// Using Object.create, make myBike that INHERITS from vehicleBase,
// and give it its OWN properties: kind: "bike", wheels: 2, brand: "EcoRide".
let myBike;
// e.g., myBike.kind = "bike"; ...
myBike = Object.create(vehicleBase);
myBike.kind = "bike";
myBike.wheels = 2;
myBike.brand = "EcoRide";

// Check prototype data access (should read from prototype if not on the object itself).
console.log("myBike.kind     =", myBike.kind);
console.log("myBike.wheels   =", myBike.wheels);
console.log("myBike.powered  =", myBike.powered);

// ------------------------------
//// Task 7 — Object.keys / Object.values with decisions (no loops)
// ------------------------------
console.log("\\nTask 7 — keys & values");
let scores = { Alice: 17, Bob: 22, Carol: 22 };

// 1) Make two variables: names = Object.keys(scores), numbers = Object.values(scores)
/* TODO */
let names = Object.keys(scores); // output will be array
let numbers = Object.values(scores);

// 2) Make 'hasBob' true if "Bob" exists in names.
let hasBob;
if (names.includes("Bob")) {
	hasBob = true;
} else {
	hasBob = false;
}
// 3) Decide a winner name and store in 'winner' by comparing the known properties with if/else.
//    If there is a tie, set winner to "TIE". (No loops; compare known keys)
let winner;
winner = []; // it should turn to array or get error from .push()

// if (numbers[0] >= numbers[1] && numbers[0] >= numbers[2]) {
// 	winner.push(names[0]);
// }
// if (numbers[1] >= numbers[0] && numbers[1] >= numbers[2]) {
// 	winner.push(names[1]);
// }
// if (numbers[2] >= numbers[0] && numbers[2] >= numbers[1]) {
// 	winner.push(names[2]);
// }
if (numbers[0] > numbers[1] && numbers[0] > numbers[2]) {
    winner = names[0]; // Alice
} else if (numbers[1] > numbers[0] && numbers[1] > numbers[2]) {
    winner = names[1]; // Bob
} else if (numbers[2] > numbers[0] && numbers[2] > numbers[1]) {
    winner = names[2]; // Carol 
} else {
    // If no one has a highest score, it must be a tie.
    winner = "TIE";
}

console.log("names  =", names);
console.log("numbers=", numbers);
console.log("hasBob =", hasBob);
console.log("winner =", winner);

// ------------------------------
//// Task 8 — If / Else if / Else rules (ticket price)
// ------------------------------
console.log("\\nTask 8 — Ticket price rules");
let customer = { age: 20, isStudent: true, hasCoupon: true };
// Rules (in this order):
//   1) If age < 6: price = 0
//   2) Else if age <= 18 OR isStudent is true: price = 8
//   3) Else if age >= 65: price = 6
//   4) Else: price = 12
//   After that, if hasCoupon is true, subtract 2 (but not below 0).
let price;

if (customer.age < 6) {
	price = 0;
} else if (customer.age <= 18 || customer.isStudent === true) {
	// i can write customer.isStudent because it's always true
	price = 8;
} else if (customer.age >= 65) {
	price = 6;
} else {
	price = 12;
}
if (customer.hasCoupon) {
	price -= 2; // OR price = price -2
}

console.log("price =", price);

// ------------------------------
// Task 9 — String methods
// ------------------------------
console.log("\\nTask 9 — String methods");
let rawName = "   PreProgramming JavaScript   ";

// Create 'displayName' so that:
//   - trims spaces
//   - first letter uppercase
//   - rest lowercase (for the first word only is OK here)
let displayName;

displayName = rawName.trim();
displayName = displayName.toLowerCase().split(" "); // trun to array
let word_P = displayName[0][0].toUpperCase(); // P
// let word_J = displayName[1][0].toUpperCase(); // J

displayName[0] = word_P + displayName[0].slice(1); // Preprogramming
// displayName[1] = word_J + displayName[1].slice(1); // Javascript
displayName = displayName.join(" "); // turn to string

console.log(displayName); // Preprogramming javascript

// Create 'hasProgram' that is TRUE if the (trimmed, lowercased) string contains "program".
let hasProgram;

hasProgram = rawName.trim().toLowerCase().includes("program"); // true
/* Note
trim, lowercase don't overwrite on parent variable
*/
console.log("displayName =", displayName);
console.log("hasProgram  =", hasProgram);
