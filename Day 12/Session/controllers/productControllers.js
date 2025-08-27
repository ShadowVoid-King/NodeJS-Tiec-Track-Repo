const { tokenData } = require("../models/token");
const { productData } = require("../models/products");
async function isLoggedIn(username) {
	const user = await tokenData.findOne({ username });
	if (user) {
		return user;
	}
	return null;
}

async function isAdminUser(username) {
	const currentUser = await isLoggedIn(username);
	// check currentUser because if currentUser = null so it can't back currentUser.role
	// i can currentUser.role with Try Catch
	return currentUser && currentUser.role === "admin";
}

getUserToken = tokenData.findOne({ username });

const productsGet = async (req, res) => {
	try {
		const user = await isLoggedIn(getUserToken);
		if (user) {
			const products = await productData.find();
			return res.json(products);
		} else {
			res.status(401).send("401, User Not Logged In");
		}
	} catch (error) {
		return res.json({ message: error.message });
	}
};

const productGetById = async (req, res) => {
	try {
		const user = await isLoggedIn(getUserToken);
		if (user) {
			return res.json(await productData.findById(req.params.id));
		} else {
			res.status(401).send("401, User Not Logged In");
		}
	} catch (error) {
		return res.json({ message: error.message });
	}
};

const addProductPost = async (req, res) => {
	try {
		const user = await isLoggedIn(getUserToken);
		if (user) {
			const { title, price, description, quantity } = req.body;
			const products = await productData.find();
			const idIncrement = products.length + 1;
			const newProduct = new productData({
				id: idIncrement,
				title,
				quantity,
				price,
				description,
			});
			await newProduct.save();
			res.status(200).json({ message: "Product added successfully" });
		} else {
			res.status(401).send("401, User Not Logged In");
		}
	} catch (error) {
		return res.json({ message: error.message });
	}
};

const deleteProductDelete = async (req, res) => {
	try {
		const user = await isAdminUser(getUserToken);
		if (user) {
			await productData.findByIdAndDelete(req.params.id);
			res.status(200).json({ message: "Product deleted successfully" });
		} else {
			res.status(401).send("401, User Not Logged In");
		}
	} catch (error) {
		return res.json({ message: error.message });
	}
};

const editProductPut = async (req, res) => {
	try {
		const user = await isAdminUser(getUserToken);
		if (user) {
			const { title, price, description, quantity } = req.body;
			await productData.findByIdAndUpdate(req.params.id, {
				title,
				quantity,
				price,
				description,
			});
			res.status(200).json({ message: "Product updated successfully" });
		} else {
			res.status(401).send("401, User Not Logged In");
		}
	} catch (error) {
		return res.json({ message: error.message });
	}
};

module.exports = {
	productsGet,
	productGetById,
	addProductPost,
	deleteProductDelete,
	editProductPut,
};
