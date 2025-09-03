const { app } = require("./index");
// Home
const { homePage } = require("./controllers/homePageController");

// Auth
const { register } = require("./controllers/Auth Routes/registerController");
const {
	loginStart,
	loginVerify,
} = require("./controllers/Auth Routes/loginController");
const { forgotPassword } = require("./controllers/Auth Routes/forgotPasswordController");
const { newPassword } = require("./controllers/Auth Routes/newPasswordController");
const { logout } = require("./controllers/Auth Routes/logoutController");

// Categories
const { getCategories } = require("./controllers/Categories Routes/getCategoriesController");
const { addCategories } = require("./controllers/Categories Routes/addCategoriesController");
const { deleteCategories } = require("./controllers/Categories Routes/deleteCategoriesController");

// Profile
const { profile } = require("./controllers/Profile Routes/profileController");
const {changeName} = require("./controllers/Profile Routes/changeNameController"); // changeName} 
const {changePassword} = require("./controllers/Profile Routes/changePasswordController");
const { enableOtp } = require("./controllers/Profile Routes/enableOtpController");

// Notes
const { createNote } = require("./controllers/Notes Routes/CreateNoteController");
const { getAllNotes } = require("./controllers/Notes Routes/GetAllNotesController");
const { getSingleNote } = require("./controllers/Notes Routes/GetSingleNoteController");
const { updateNote } = require("./controllers/Notes Routes/UpdateNoteController");
const { deleteNote } = require("./controllers/Notes Routes/DeleteNoteController");
const { partialUpdateNote } = require("./controllers/Notes Routes/PartialUpdateNoteController");

//! Breaking Point

//~ HomePage Routes
app.get("/", homePage);

//~ Auth Routes
app.post("/auth/register", register);
app.post("/auth/login/start", loginStart);
app.post("/auth/login/verify", loginVerify);
app.post("/auth/forgot-password", forgotPassword);
app.post("/auth/reset-password", newPassword);
app.delete("/auth/logout", logout);

//~ Profile Routes
app.get("/profile", profile)
app.post("/profile/change-first-last-name", changeName);
app.post("/profile/change-password", changePassword);
app.post("/profile/enable-otp", enableOtp);


//~ Categories Routes
app.get("/categories", getCategories)
app.post("/categories", addCategories)
app.delete("/categories/:id", deleteCategories)

//~ Notes Routes
app.get("/notes", getAllNotes)
app.get("/notes/:id", getSingleNote)
app.post("/notes", createNote)
app.put("/notes/:id", updateNote)
app.patch("/notes/:id", partialUpdateNote)
app.delete("/notes/:id", deleteNote)