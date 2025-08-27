const { app } = require("./index");

const { login } = require("./controllers/loginController");
const { register } = require("./controllers/registerController");
const { logout } = require("./controllers/logoutController");
const { sendOtp } = require("./controllers/senOtpController");
const { newPassword } = require("./controllers/newPasswordController");
// products
const { productsGet, productGetById, addProductPost, deleteProductDelete, editProductPut } = require("./controllers/productControllers");


// CRUD Operations
app.post("/login", login);

app.post("/register", register);
app.post("/logout", logout);

app.post("/otp", sendOtp);
app.post("/new-password", newPassword);

app.get("/products", productsGet);
app.get("/products/:id", productGetById);
app.post("/add-product", addProductPost);
app.delete("/delete-product/:id", deleteProductDelete);
app.put("/edit-product/:id", editProductPut);
