const EventEmitter = require('node:events');

const eventEmitter = new EventEmitter();

eventEmitter.on("CreateProduct", (sku, name, qty, threshold) => console.log(`Added ${name} (${sku}) qty=${qty}, low<=${threshold}`));

eventEmitter.on("StockChanged", (sku, qty) => console.log(`${sku} stock changed → ${qty}`));

eventEmitter.on("InventoryLow", (sku, qty, threshold) => console.log(`${sku} LOW STOCK (${qty}) ≤ threshold (${threshold}) — reorder soon`));

eventEmitter.on("InventoryOut", (sku) => console.log(`${sku} OUT OF STOCK`));

eventEmitter.on("Restocked", (sku, qty) => console.log(`${sku} restocked → ${qty}`));

eventEmitter.on("Error", (message) => console.log(`${message}`));

eventEmitter.on("HealthyStock", (sku, qty) => console.log(`${sku} healthy stock → ${qty}`));

// --- Tiny in-memory "DB"
const db = {}; // { [sku]: { name, qty, threshold } }

// --- Core API (students finish the TODO emits)
function createProduct(sku, name, qty = 0, threshold = 2) {
    db[sku] = { name, qty, threshold };
    // TODO: emit 'product:created' with { sku, name, qty, threshold }
    eventEmitter.emit("CreateProduct", sku, name, qty, threshold);

}

// ! FOCUS

function sell(sku, amount = 1) {
    const item = db[sku];
    // if no item, emit 'error' with { message: `No product ${sku}` }
    // if amount <= 0, emit 'error' with { message: 'Amount must be > 0' }
    // if item.qty < amount, emit 'error' with { message: 'Insufficient stock' }

    item.qty -= amount;

    // TODO: always emit 'stock:changed' with { sku, qty: item.qty }
    if (item.qty <= item.threshold) {
        eventEmitter.emit("HealthyStock", sku, item.qty);
    }
    // eventEmitter.emit("StockChanged", sku, item.qty);

    // TODO: if qty === 0 -> emit 'inventory:out' with { sku }
    if (item.qty === 0) {
        eventEmitter.emit("InventoryOut", sku);
    }

    if ( item.qty <= item.threshold) {
        eventEmitter.emit("InventoryLow", sku, item.qty, item.threshold);
    }
    // else if qty <= threshold -> emit 'inventory:low' with { sku, qty, threshold: item.threshold }
    //* ERROR Message
    if (item.qty < 0) {
        eventEmitter.emit("Error", "Insufficient stock");
    }
}

function restock(sku, amount = 1) {
    const item = db[sku];
    // if no item, emit 'error' with { message: `No product ${sku}` }
    if ( amount <= 0) {
        eventEmitter.emit("Error", "Amount must be > 0");
    }
    // if amount <= 0, emit 'error' with { message: 'Amount must be > 0' }
    if ( item.qty < 0) {
        eventEmitter.emit("Error", "Insufficient stock");
    }

    item.qty += amount;

    // TODO: emit 'restocked' with { sku, qty: item.qty }
    if ( item.qty <= item.threshold) {
        eventEmitter.emit("HealthyStock", sku, item.qty);
    }//
    eventEmitter.emit("Restocked", sku, item.qty);
    // If qty > threshold -> emit 'inventory:ok' with { sku, qty }
    if ( item.qty > item.threshold) {
        eventEmitter.emit("HealthyStock", sku, item.qty);
    }
}

// --- Demo flow (expected output below after you implement emits)
createProduct('USB-C', 'USB-C Cable', 3, 2);
sell('USB-C', 1);  // qty 2 -> LOW
sell('USB-C', 2);  // qty 0 -> OUT
restock('USB-C', 5); // qty 5 -> RESTOCK + OK

/*
Expected (order may vary slightly):
🆕 Added USB-C Cable (USB-C) qty=3, low<=2
🔢 USB-C stock changed → 2
⚠️  USB-C LOW STOCK (2) ≤ threshold (2) — reorder soon
🔢 USB-C stock changed → 0
⛔ USB-C OUT OF STOCK — stop selling
✅ USB-C restocked → 5
🟢 USB-C healthy stock → 5
*/
