const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('*', function (req, res) {
	res.sendFile(path(__dirname, '../build/index.html'));
});

app.listen(PORT);
