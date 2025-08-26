/* 
app.get('/add-student')
app.post('/add-student')
app.get('/students')

+ bonus 50*3 for each link
app.get('/edit-student/:id')
app.post('/edit-student/:id')
app.post('/delete-student/:id')

*/
const { users } = require("../models/users");
const { loadLoggedInUser, loadUsers, saveUsers } = require("../utils");

loadUsers(users, "data/users.json");
const loggedInUSer = loadLoggedInUser("data/loggedInUser.json");

const studentsArr = [];
loadUsers(studentsArr, "data/students.json");

const addStudentGet = (req, res) => {
	message = null;
	user = loggedInUSer;

	res.render("add-student", { message });
};

const addStudentPost = (req, res) => {
	user = loggedInUSer;
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
        res.render("add-student", { message });
	}
};

const studentsGet = (req, res) => {
	user = loggedInUSer;
    search = false;
    //! Not Make Sense, because there is full data in view-students page
    students = studentsArr.map((student) => ({
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email
    }))
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
	
}
const studentEditPost = (req, res) => {
	
}

const studentDeletePost = (req, res) => {
	
}
module.exports = { addStudentGet, addStudentPost, studentsGet };
