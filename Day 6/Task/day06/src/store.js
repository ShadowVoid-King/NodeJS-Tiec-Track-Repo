const events = require("./node:events");

// An order: { id, customer, item, qty, status }   status ∈ "new" | "paid" | "packed" | "shipped" | "canceled"
let nextId = 1;
const orders = [
	{ id: 1, customer: "John Doe", item: "Laptop", qty: 1, status: "new" },
	{ id: 2, customer: "Jane Smith", item: "Mouse", qty: 2, status: "paid" },
	{
		id: 3,
		customer: "Peter Jones",
		item: "Keyboard",
		qty: 1,
		status: "shipped",
	},
	{
		id: 4,
		customer: "Alice Williams",
		item: "Webcam",
		qty: 1,
		status: "canceled",
	},
]; // keep simple for the exercise

function createOrder(customer, item, qty) {
	// validate inputs (non-empty customer/item, qty > 0)
	// If invalid, return { ok:false, error:"message" }
	// Create a new order with the following properties:
	// id: nextId++,
	// customer: customer.trim(),
	// item: item.trim(),
	// qty: Number(qty),
	// status: "new"
    // Add the order to the orders array
    if (customer.trim() === "" || item.trim() === "" || qty <= 0) {
        return events.emit("error", "Invalid inputs");
    } else {
        const newOrder = {
            id: nextId++,
            customer: customer.trim(),
            item: item.trim(),
            qty: Number(qty),
            status: "new"
        };
        orders.push(newOrder);
    }
    // Return { ok:true, order }
    return events.emit("order:created", newOrder);
}

function findById(id) {
	// classic loop to find the order by id from the orders array
	for (let i = 0; i < orders.length; i++) {
		if (orders[i].id === id) {
			return orders[i];
		} else {
			// Return the order if found, otherwise return null
			return events.emit("error", "Order not found");
		}
	}
}

function list() {
	// return a shallow copy of the orders array
	return orders.slice();
}

function setStatus(id, newStatus) {
	// find the order by id from the orders array

	findById(id);

	// if the order is not found, return { ok: false, error: "Order not found" }
	if (!order) {
		return events.emit("error", "Order not found");
		// if the order is found, update the status of the order to the newStatus
	} else {
		order.status = newStatus;
	}
	// return { ok: true, order }
	return events.emit("order:statusChanged", order);
}

// export the functions to be used in the application
module.exports = { createOrder, findById, list, setStatus };
