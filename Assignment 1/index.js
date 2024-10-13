const express = require('express');
const path = require('path');

app = express();
app.use(express.static(path.join(__dirname, '')));

const PORT = 8080;
app.listen(PORT, () => console.log(`open 127.0.0.1:${PORT}`));

