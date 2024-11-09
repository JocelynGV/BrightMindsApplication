import sqlite3 from 'sqlite3';

// Open a database connection using the Database constructor
const db = new sqlite3.Database('my-database.db', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Example: Create a table if it doesn't exist
db.serialize(() => {
    //subject table
    db.run(`CREATE TABLE IF NOT EXISTS subjects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject_name TEXT NOT NULL
    )`);

    // topics table
    db.run(`CREATE TABLE IF NOT EXISTS topics (
        tid INTEGER PRIMARY KEY AUTOINCREMENT,
        subject_id INTEGER,
        name VARCHAR(50) NOT NULL,
        FOREIGN KEY (subject_id) REFERENCES subjects(id)
    )`);

    //questions and answers table 
    db.run(`CREATE TABLE IF NOT EXISTS questions (
        qid INTEGER PRIMARY KEY AUTOINCREMENT,
        topics_tid INTEGER,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        FOREIGN KEY (topic_tid) REFERENCES topics(tid)
    )`);

    // Example: Insert a row
    const stmt = db.prepare(`INSERT INTO subjects (subject_name) VALUES (?)`);
    stmt.run('English');
    stmt.finalize();

    // Example: Query the table
    db.all(`SELECT * FROM subjects`, [], (err, rows) => {
        if (err) {
            throw err;
        }
        console.log(rows);
    });
});

// Close the database connection
db.close((err) => {
    if (err) {
        console.error('Error closing database ' + err.message);
    } else {
        console.log('Closed the database connection.');
    }
});
