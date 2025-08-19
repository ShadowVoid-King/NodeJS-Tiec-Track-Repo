// require the eventBus and store from the respective files

const bus = require("./eventBus"); // eventBus
const store = require("./store"); // store

//* make order:created event listener to log the order created
// console.log the following message: [EVT] order:created #<id of the order> for <customer name who created the order> (<order item> x<qty of the item ordered>)

bus.on("order:created", (order) => { // order come from sotre
    console.log(`[EVT] order:created #${order.id} for ${order.customer} (${order.item} x${order.qty})`);
});


//* make order:paid event listener to log the order paid
// if the order is not found, emit 'error' event with the message "Order not found"
bus.on("error", (order) => {
    console.log(`[ERR] ${order}`);
})
// this event listener should transition the order to "paid" using store.setStatus function
bus.on("order:paid", (order) => {  
    if (!order) return bus.emit("error", "Order not found");
    console.log(`[EVT] order:paid #${order.id}`);
    store.setStatus(order.id, "paid");
})

// if the order is already shipped or canceled, emit 'error' event with the message "Invalid transition to paid"
// console.log the following message: [EVT] order:paid #<id of the order>
// emit "order:statusChanged" with the id and status=paid

bus.on("order:statusChanged", (order) => {
    if (order.status === "shipped" || order.status === "canceled") return bus.emit("error", "Invalid transition to paid");

    console.log(`[EVT] order:statusChanged #${order.id} status=${order.status}`);
});

//* make order:packed event listener to log the order packed
// if the order is not found, emit 'error' event with the message "Order not found"
// if the order is not paid, emit 'error' event with the message "Pack requires status=paid"
// this event listener should transition the order to "packed" using store.setStatus function
// console.log the following message: [EVT] order:packed #<id of the order>
// emit "order:statusChanged" with the id and status=packed

bus.on("order:packed", (order) => {
    if (!order) return bus.emit("error", "Order not found");
    
    if (order.status !== "paid") return bus.emit("error", "Pack requires status=paid");
    
    store.setStatus(order.id, "packed");
    
    console.log(`[EVT] order:packed #${order.id}`);
})


//* make order:shipped event listener to log the order shipped
// if the order is not found, emit 'error' event with the message "Order not found"
// if the order is not packed, emit 'error' event with the message "Ship requires status=packed"
// this event listener should transition the order to "shipped" using store.setStatus function
// console.log the following message: [EVT] order:shipped #<id of the order>
// emit "order:statusChanged" with the id and status=shipped
bus.on("order:shipped", (order) => {
    if (!order) return bus.emit("error", "Order not found");
    
    if (order.status !== "packed") return bus.emit("error", "Ship requires status=packed");

    if (order.status === "shipped") return bus.emit("error", "Order already shipped"); //! Change
    
    store.setStatus(order.id, "shipped");

    console.log(`[EVT] order:shipped #${order.id}`);
    
    bus.emit("order:statusChanged", order);
})

//* make order:canceled event listener to log the order canceled
// if the order is not found, emit 'error' event with the message "Order not found"
// if the order is already shipped, emit 'error' event with the message "Cannot cancel shipped order"
// this event listener should transition the order to "canceled" using store.setStatus function
// console.log the following message: [EVT] order:canceled #<id of the order> ❌
// emit "order:statusChanged" with the id and status=canceled
bus.on("order:canceled", (order) => {
    if (!order) return bus.emit("error", "Order not found");
    
    if (order.status === "shipped") return bus.emit("error", "Cannot cancel shipped order");
    store.setStatus(order.id, "canceled");
    console.log(`[EVT] order:canceled #${order.id} ❌`);
    bus.emit("order:statusChanged", order);
})

//* make order:statusChanged event listener to log the order status changed
// console.log the following message: [EVT] statusChanged  #<id of the order> → <status of the order>
bus.on("order:statusChanged", (order) => {
    console.log(`[EVT] statusChanged  #${order.id} → ${order.status}`);
})

//* make error event listener to log the error
// console.log the following message: [ERR] <error message>
bus.on("errorLog", (error) => {
    console.log(`[ERR] ${error}`);
})

// Export nothing; requiring this file attaches listeners

module.exports = {};
