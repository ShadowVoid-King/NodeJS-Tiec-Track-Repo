/* 
promise
then > catch
all ( oppiste ) != any ( back array if reject; back only one resolve)
race > fast one ( resolve or reject )
*/
/*
let promise = new Promise((resolve, reject) => {
	if (true) {
		resolve("Success");
	} else {
		reject("Error");
	}
})
	.then((res) => {
		// res can be any name
		console.log(res);
	})
	.catch((res) => {
		console.log(res);
	});

Promise.all([promise]) // Promise.all Should be in Array
	.then((res) => {
		console.log(res);
	})
	.catch((res) => {
		console.log(error);
	});
*/

const { promises } = require("readline");

// promises.any