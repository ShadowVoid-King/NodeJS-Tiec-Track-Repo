// require the eventBus and store from the respective files

// make order:created event listener to log the order created
// console.log the following message: [EVT] order:created #<id of the order> for <customer name who created the order> (<order item> x<qty of the item ordered>)

// make order:paid event listener to log the order paid
// if the order is not found, emit 'error' event with the message "Order not found"
// this event listener should transition the order to "paid" using store.setStatus function
// if the order is already shipped or canceled, emit 'error' event with the message "Invalid transition to paid"
// console.log the following message: [EVT] order:paid #<id of the order>
// emit "order:statusChanged" with the id and status=paid

// make order:packed event listener to log the order packed
// if the order is not found, emit 'error' event with the message "Order not found"
// if the order is not paid, emit 'error' event with the message "Pack requires status=paid"
// this event listener should transition the order to "packed" using store.setStatus function
// console.log the following message: [EVT] order:packed #<id of the order>
// emit "order:statusChanged" with the id and status=packed

// make order:shipped event listener to log the order shipped
// if the order is not found, emit 'error' event with the message "Order not found"
// if the order is not packed, emit 'error' event with the message "Ship requires status=packed"
// this event listener should transition the order to "shipped" using store.setStatus function
// console.log the following message: [EVT] order:shipped #<id of the order>
// emit "order:statusChanged" with the id and status=shipped

// make order:canceled event listener to log the order canceled
// if the order is not found, emit 'error' event with the message "Order not found"
// if the order is already shipped, emit 'error' event with the message "Cannot cancel shipped order"
// this event listener should transition the order to "canceled" using store.setStatus function
// console.log the following message: [EVT] order:canceled #<id of the order> ❌
// emit "order:statusChanged" with the id and status=canceled

// make order:statusChanged event listener to log the order status changed
// console.log the following message: [EVT] statusChanged  #<id of the order> → <status of the order>

// make error event listener to log the error
// console.log the following message: [ERR] <error message>

// Export nothing; requiring this file attaches listeners

module.exports = {};
