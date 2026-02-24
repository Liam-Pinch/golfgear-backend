const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./golfgear.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT DEFAULT 'user'
    )`);
});

module.exports = db;