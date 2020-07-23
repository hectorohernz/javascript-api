const express = require('express');
const app = express();

app.use(express.static(__dirname + "/public"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, (req,res) => {
    console.log(`The applcation is active on port ${PORT}`);
});