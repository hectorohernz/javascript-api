const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


app.post('/add', (req, res) => {
    console.log(req.body);
    res.status(200).send("Post request received")
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req,res) => {
    console.log(`The applcation is active on port ${PORT}`);
});

