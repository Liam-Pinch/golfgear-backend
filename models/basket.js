const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./golfgear.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS baskets(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES users(id),
        FOREIGN KEY(product_id) REFERENCES products(id)
    )`);
});

module.exports = db;