const mysql = require('mysql2');

const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


const connection = mysql.createConnection({ // Creating a connection to local sql database 
    host: 'localhost',
    user: 'root',
    password: 'Ilovetoby',
    database: 'todo'
});


try { // Attempting to connect to the database 
    connection.connect();
    console.log("Sql has connected");

} catch (e) {
    console.log('Oops. Connection to MySQL failed.');
    console.log(e);
}

app.post('/task/add', (req, res) => { 
    console.log(req.body);
    connection.query('INSERT INTO tasks (description) VALUES (?)', [req.body.item], (error, results) => {
        if (error) return res.json({ error: error });

        connection.query('SELECT LAST_INSERT_ID() FROM tasks', (error, results) => {
            if (error) return res.json({ error: error });

            res.json({ // sending object to the browser 
                id: results[0]['LAST_INSERT_ID()'],
                description: req.body.item
            });
        });


    });
});

app.get('/task', (req,res) => {
    connection.query("SELECT * FROM tasks ORDER BY created DESC", (error,results) => {
        if(error) return res.json({error: error})

        res.json(// List the completed task and uncompleted task
           results
        )
    });
});

app.post('/task/:id/remove', (req,res) => {
    connection.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (error,results) => {
        if (error) return res.json({ error: error });

        res.json({});

    });
});


    const PORT = process.env.PORT || 5000;

    app.listen(PORT, (req, res) => {
        console.log(`The applcation is active on port ${PORT}`);
    });

