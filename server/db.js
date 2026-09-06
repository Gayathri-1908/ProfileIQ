const Database = require("better-sqlite3");
const path = require("path");

// Create/Open SQLite database
const db = new Database(path.join(__dirname, "profileiq.db"));

// Improve concurrency
db.pragma("journal_mode = WAL");

// Create users table
db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,

    password TEXT,

    googleId TEXT,
    picture TEXT,
    provider TEXT DEFAULT 'local',

    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);

// Automatically upgrade older databases
const columns = db.prepare("PRAGMA table_info(users)").all().map(c => c.name);

if (!columns.includes("googleId")) {
    db.exec("ALTER TABLE users ADD COLUMN googleId TEXT");
}

if (!columns.includes("picture")) {
    db.exec("ALTER TABLE users ADD COLUMN picture TEXT");
}

if (!columns.includes("provider")) {
    db.exec("ALTER TABLE users ADD COLUMN provider TEXT DEFAULT 'local'");
}

module.exports = db;