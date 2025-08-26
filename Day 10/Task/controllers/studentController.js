/* 
app.get('/add-student')
app.post('/add-student')
app.get('/students')

+ bonus 50*3 for each link
app.get('/edit-student/:id')
app.post('/edit-student/:id')
app.post('/delete-student/:id')

*/
const { message } = require("statuses");
const { users } = require("../models/users");
const { loadLoggedInUser, loadUsers, saveUsers } = require("../utils");

loadUsers(users, "data/users.json");
const loggedInUSer = loadLoggedInUser("data/loggedInUser.json");

const studentsArr = [];
loadUsers(studentsArr, "data/students.json");
app.locals.user = loggedInUSer; // global variable
app.locals.message = null; // global variable
const addStudentGet = (req, res) => {
	message = null;
	res.render("add-student", { message ,user});
};

const addStudentPost = (req, res) => {
	try {
		const studentData = {
			id: studentsArr.length + 1,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			age: req.body.age,
			course: req.body.course,
			status: req.body.status,
		};
		if (loggedInUSer.role !== "admin") {
			return res.status(403).send("Forbidden");
		}
		if (
			!studentData.firstName ||
			!studentData.lastName ||
			!studentData.email ||
			!studentData.age ||
			!studentData.status
		) {
			return res.status(400).send("Missing required fields");
		}
		studentsArr.push(studentData); // this step will add student data to the students array not overwrite
		saveUsers(studentsArr, "data/students.json");
		res.render("add-student", { message: "Student added successfully" });
	} catch (error) {
		message = "Adding Student  Failed, Please Try Again";
		res.render("add-student", { message, user });
	}
};

const studentsGet = (req, res) => {
	search = false;
	//! Not Make Sense, because there is full data in view-students page
	students = studentsArr.map((student) => ({
		id: student.id,
		firstName: student.firstName,
		lastName: student.lastName,
		email: student.email,
	}));
	const canEdit = true;
	const canDelete = true;
	res.render("view-students", { students, canEdit, canDelete });
};

/* 
app.get('/edit-student/:id')
app.post('/edit-student/:id')
app.post('/delete-student/:id')
*/
const studentEditGet = (req, res) => {
    let message = null;

    if (!loggedInUSer || loggedInUSer.role !== "admin") {
        return res.status(403).render("error", { 
            message: "Access denied", 
            user: loggedInUSer 
        });
    }
	
	studentID = req.params.id;
	student = studentsArr.find((student) => student.id == studentID);
	if (!student) {
		return res.status(404).send("Student not found");
	}
	// const { firstName, lastName, email, age, course, status } = req.body;
	// res.render("navbar", { user });
	return res.render("edit-student", { user, student, message });
};
const studentEditPost = (req, res) => {

	if (!loggedInUSer || loggedInUSer.role !== "admin") {
		return res.status(403).render("error", { 
			message: "Access denied", 
			user: loggedInUSer 
		});
	}
	
	studentID = req.params.id;
	student = studentsArr.find((student) => student.id == studentID);
	if (!student) {
		return res.status(404).send("Student not found");
	}
	const { firstName, lastName, email, age, course, status } = req.body;

	student.firstName = firstName;
	student.lastName = lastName;
	student.email = email;
	student.age = age;
	student.course = course;
	student.status = status;
	saveUsers(studentsArr, "data/students.json");

	return res.render("edit-student");
};

const studentDeletePost = (req, res) => {

	if (!loggedInUSer || loggedInUSer.role !== "admin") {
		return res.status(403).render("error", { 
			message: "Access denied", 
			user: loggedInUSer 
		});
	}
	
	studentID = req.params.id;
	student = studentsArr.find((student) => student.id == studentID);
	if (!student) {
		return res.status(404).send("Student not found");
	}
	studentsArr.splice(studentsArr.indexOf(student), 1);
	saveUsers(studentsArr, "data/students.json");
	return res.redirect("/students");
};
module.exports = { addStudentGet, addStudentPost, studentsGet ,studentEditGet, studentEditPost, studentDeletePost};
