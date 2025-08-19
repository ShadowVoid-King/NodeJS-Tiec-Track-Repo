// An order: { id, customer, item, qty, status }   status ∈ "new" | "paid" | "packed" | "shipped" | "canceled"
let nextId = 1;
const orders = []; // keep simple for the exercise

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

    // Return { ok:true, order }
}

function findById(id) {
    // classic loop to find the order by id from the orders array
    // Return the order if found, otherwise return null
}

function list() {
    // return a shallow copy of the orders array
}

function setStatus(id, newStatus) {
    // find the order by id from the orders array
    // if the order is not found, return { ok: false, error: "Order not found" }
    // if the order is found, update the status of the order to the newStatus
    // return { ok: true, order }
}

// export the functions to be used in the application
