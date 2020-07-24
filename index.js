const mysql = require('mysql2');

const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ilovetoby',
    database: 'todo' //dont have this yet
});


try {
    connection.connect();
    console.log("Sql has connected");

   } catch (e) {
    console.log('Oops. Connection to MySQL failed.');
    console.log(e);
}

app.post('/add', (req, res) => {
    console.log(req.body);
    res.status(200).send("Post request received")
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
    console.log(`The applcation is active on port ${PORT}`);
});

