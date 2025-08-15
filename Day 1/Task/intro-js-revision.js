// Intro to JavaScript — Revision Practice
// ----------------------------------------------------
// Instructions:
// 1) Open this file in VS Code (or any editor).
// 2) Work through the tasks in order. Replace the TODOs with code.
// 3) Run the file using:  node intro-js-revision.js
// 4) You should see outputs in your terminal for each console.log.
//
// NOTE: Try to predict the output BEFORE running, then confirm.
// ----------------------------------------------------

"use strict";

// ---------- Shared Dataset (reuse across tasks) ----------
const student = {
  name: "Amina",
  age: 19,
  contact: {
    email: "amina@example.com",
    phones: ["+201100000000", "+201122233344"],
  },
  favorites: {
    colors: ["red", "green", "blue"],
    books: [
      { title: "Eloquent JavaScript", authors: ["Marijn Haverbeke"] },
      { title: "You Don't Know JS", authors: ["Kyle Simpson"] },
    ],
  },
};

const classroom = {
  courseName: "Intro to JavaScript",
  batches: [
    {
      id: "AUG",
      students: [
        { id: "s1", name: "Amina", scores: [10, 15, 20] },
        { id: "s2", name: "Omar", scores: [12, 18, 17] },
      ],
    },
    {
      id: "SEP",
      students: [{ id: "s3", name: "Sara", scores: [20, 19, 18] }],
    },
  ],
  materials: ["console", "strings", "arrays", "objects"],
};

//^ Breaker
let br = "#####".repeat(20);
let brSmall = "####".repeat(10);
let batchesRoot = classroom.batches;
let fav = student.favorites;

// Helper for visual separation of outputs
function hr(title) {
  console.log("\\n----- " + title + " -----");
}
// ##################################################################################################################
// ========================================================
//~ A) Console basics
// ========================================================
hr("A) Console basics");

// 1) Log the course name from `classroom`.

console.log(classroom.courseName); // Intro to JavaScript

// 3) Log the entire `student` object, then log only `student.contact`.
console.log("student $", student);
console.log("contact $", student.contact); // all obj

// 4) How many phone numbers does Amina have? (use phones array length from student object)
console.log("numbers does Amina $", student.contact.phones.length);

// 5) Log the third course material from classroom materials (use materials array from classroom object)
console.log("classroom materials $", classroom.materials[2]); // arrays

// ========================================================
//~ B) Strings vs. numbers (the `+` operator)
// ========================================================
hr("B) Strings vs. numbers");

// 6) Predict the outputs, then log them:
console.log(2 + 3); // 5   > num
console.log("2" + 3); // 23  > str
console.log(2 + "3"); // 23  > str
console.log("2" + "3"); // 23  > str
console.log(2 + 3 + "5"); // 55  > str
console.log("5" + 2 + 3); // 523 > str( because "5" and 2 turn to "52" + 3 that's why answer will be "523" because )

// 7) a="10", b=5. Log numeric sum (15) and string concatenation ("105").
const a = "10";
const b = 5;
TODO: console.log(`numeric sum => a + b = ${Number(a) + b}`); // 15
TODO: console.log(`string concatenation => a + b = ${a + b}`); // 105

console.log(br);

// ========================================================
//~ C) Arrays & objects (direct access)
// ========================================================
hr("C) Arrays & objects");

// 9) Log Amina’s first phone number.
console.log(student.contact.phones[0]); //* "+201100000000"

// 10) Log the LAST favorite color (no hardcoded index).
//* No use numbers
console.log(fav.colors[fav.colors.length - 1]); //* blue

// 11) Log the title of the second favorite book.
console.log(fav.books.at(-1).title); //* You Don't Know JS

// 12) From classroom.batches[0], log the name of the second student.
//* Print Whole Object
console.log(batchesRoot[0].students[1]); //* Omar Obj

// 13) Add "purple" to favorite colors, then log the updated array.
/* TODO: push to student.favorites.colors */

fav.colors.push("purple"); //^ Another Way
// fav.colors[fav.colors.length] = "purple"; //^ Another Way
console.log(fav.colors);

// ========================================================
// D) Deeply nested access (no loops required)
// ========================================================
hr("D) Deeply nested access");

// 14) Log the first author of the first favorite book.
console.log(fav.books.at(0).authors[0]); //* Marijn Haverbeke

// 15) Log the second score for Omar.
console.log(batchesRoot[0].students[1].scores[1]); //* 18

console.log(br);

// ========================================================
//! E) String methods practice
// ========================================================
hr("E) String methods");

const phrase = "  JavaScript is Fun and Powerful!  ";
//* Use slice or splice

// 19) Trim spaces from the phrase and log the result. (use phrase variable)
console.log(phrase.trim());

// 20) Log the phrase in UPPERCASE, then in lowercase. (use phrase variable)
console.log(phrase.trim().toUpperCase());
console.log(phrase.trim().toLowerCase());

// 22) Replace "Fun" with "Awesome" and log the new phrase. (use phrase variable)
console.log(phrase.trim().replace("Fun", "Awesome"));

const csv = "Amina,19,amina@example.com";
/* TODO: split and log csv variable */
//* turn to array
console.log(csv.split(","));
console.log(br);

// ========================================================
// F) Small challenge (no loops; indexing only)
// ========================================================
hr("F) Small challenge (Bounes 50 points)"); //~ Bonus

// 26) For each student in AUG, log: "Name — last score: X — contains 'a'? true/false"
/* 
* id will be aug
* name
? last socre : X ? does has A (charAt(A) or use AscII Code)
*/

// Use only console logs and indexing (no loops yet).
let root = classroom.batches[0]; //* Month

let rootName = root.students; //*  Name
// includes is senstive case
console.log(
  `id: ${root.id}\nlog: ${rootName[0].name}\nscore: ${rootName[0].scores.at(
    -1
  )}\ncontains 'a' => ${rootName[0].name.includes("a") ? true : false}`
); // alertnative use rootName[0].scores.length -1

console.log(brSmall);
let lastScore = rootName[1].scores[rootName[1].scores.length - 1]; //* Score

console.log(
  `id: ${root.id}\nlog: ${rootName[1].name
  }\nscore: ${lastScore}\ncontains 'a' => ${rootName[1].name.includes("a") ? true : false
  }`
);

// ----------------------------------------------------
// End of practice. Great job!
// ----------------------------------------------------
