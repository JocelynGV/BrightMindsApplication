import sqlite3 from 'sqlite3';

// Open a database connection
const db = new sqlite3.Database('my-database.db', (err) => {
    if (err) {
        console.error('Error opening database: ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create tables if they don't exist
db.serialize(() => {
    // Create subjects table
    db.run(`CREATE TABLE IF NOT EXISTS subjects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject_name TEXT NOT NULL
    )`, (err) => {
        if (err) console.error('Error creating subjects table: ' + err.message);
    });

    // Create topics table
    db.run(`CREATE TABLE IF NOT EXISTS topics (
        tid INTEGER PRIMARY KEY AUTOINCREMENT,
        subject_id INTEGER,
        name VARCHAR(50) NOT NULL,
        FOREIGN KEY (subject_id) REFERENCES subjects(id)
    )`, (err) => {
        if (err) console.error('Error creating topics table: ' + err.message);
    });

    // Create questions table
    db.run(`CREATE TABLE IF NOT EXISTS questions (
        qid INTEGER PRIMARY KEY AUTOINCREMENT,
        topic_tid INTEGER,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        FOREIGN KEY (topic_tid) REFERENCES topics(tid)
    )`, (err) => {
        if (err) console.error('Error creating questions table: ' + err.message);
    });

    // Insert data into subjects table
    const insertSubjects = db.prepare(`INSERT INTO subjects (subject_name) VALUES (?)`);
    insertSubjects.run('Math');
    insertSubjects.run('English');
    insertSubjects.finalize();

    // Insert data into topics table
    const insertTopics = db.prepare(`INSERT INTO topics (subject_id, name) VALUES (?, ?)`);
    insertTopics.run(1, 'Addition');
    insertTopics.run(1, 'Subtraction');
    insertTopics.run(1, 'Division');
    insertTopics.run(1, 'Multiplication');
    insertTopics.run(2, 'Basic Grammar');
    insertTopics.run(2, 'Vowels');
    insertTopics.finalize();

    // Insert data into questions table
    const insertQuestions = db.prepare(`INSERT INTO questions (topic_tid, question, answer) VALUES (?, ?, ?)`);

    // Addition Questions
    insertQuestions.run(1, 'What is 3 + 2?', '5');
    insertQuestions.run(1, 'What is 1 + 6?', '7');
    insertQuestions.run(1, 'What is 5 + 4?', '9');

    // Subtraction Questions
    insertQuestions.run(2, 'What is 9 - 4?', '5');
    insertQuestions.run(2, 'What is 10 - 2?', '8');

    // Division Questions
    insertQuestions.run(3, 'What is 12 ÷ 3?', '4');
    insertQuestions.run(3, 'What is 15 ÷ 3?', '5');

    // Multiplication Questions
    insertQuestions.run(4, 'What is 3 × 3?', '9');
    insertQuestions.run(4, 'What is 5 × 5?', '25');

    // Basic Grammar Questions
    insertQuestions.run(5, 'What is the plural of "cat"?', 'cats');
    insertQuestions.run(5, 'What is the past tense of "play"?', 'played');

    // Vowel Questions
    insertQuestions.run(6, 'Is "A" a vowel or a consonant?', 'Vowel');
    insertQuestions.run(6, 'Which vowel comes after "E"?', 'I');

    insertQuestions.finalize();

    // Query and display data from the tables
    db.all(`SELECT * FROM subjects`, [], (err, rows) => {
        if (err) {
            console.error('Error querying subjects table: ' + err.message);
        } else {
            console.log('Subjects:', rows);
        }
    });

    db.all(`SELECT * FROM topics`, [], (err, rows) => {
        if (err) {
            console.error('Error querying topics table: ' + err.message);
        } else {
            console.log('Topics:', rows);
        }
    });

    db.all(`SELECT * FROM questions`, [], (err, rows) => {
        if (err) {
            console.error('Error querying questions table: ' + err.message);
        } else {
            console.log('Questions:', rows);
        }
    });
});

// Close the database connection
db.close((err) => {
    if (err) {
        console.error('Error closing database: ' + err.message);
    } else {
        console.log('Closed the database connection.');
    }
});
