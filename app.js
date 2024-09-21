const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const db = new sqlite3.Database('userKeys.db');

db.run('CREATE TABLE IF NOT EXISTS keys (id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT NOT NULL)');

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Extract number from the link and store it
app.post('/submit', (req, res) => {
    const userLink = req.body.link;
    
    // Regular expression to extract the number from the link
    const number = userLink.match(/(\d+)/)[0];
    
    if (number) {
        db.run('INSERT INTO keys (key) VALUES (?)', [number], (err) => {
            if (err) {
                return res.status(500).send("Error storing the number in the database.");
            }
            res.send(`Number ${number} extracted from the link and stored successfully in the database!`);
        });
    } else {
        res.send("Invalid link format. Please include a number in the link.");
    }
});

// View all stored numbers (for testing)
app.get('/keys', (req, res) => {
    db.all('SELECT * FROM keys', [], (err, rows) => {
        if (err) {
            return res.status(500).send("Error fetching keys from the database.");
        }

        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
