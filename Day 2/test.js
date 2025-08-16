// https://stackoverflow.com/questions/34838294/what-is-difference-between-creating-object-using-object-create-and-object-assi

// https://javascript.plainenglish.io/copies-of-javascript-shallow-and-deep-copy-ac7f8dcd1dd0

// object.assign vs object.create


// Create Target Object
const person1 = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
};

// Create Source Object
const person2 = {firstName: "Anne",lastName: "Smith"};

// Assign Source to Target
let text = Object.assign(person1, person2);
console.log(text)

// Copies properties from a source object to a target object
// Object.assign(target, source)

// Creates an object from an existing object
// Object.create(object)