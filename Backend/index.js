const main = require('./app');
const express = require('express');
const app = express();

app.get("/", (req, res) => {
	res.json({'output' : 'main.ssh()'})
});

app.listen(5000, () => {console.log("krshh serer online on port 5000 online boss")});