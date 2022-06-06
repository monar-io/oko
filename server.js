//Requires
const express = require('express');
const app = express();
const path = require('path');
const chalk = require('chalk');
const morgan = require('morgan');
const fs = require("fs");

//Static Routes
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(morgan('dev')) // logging

//Main App Route
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/actual', (req, res, next) => {
    const actual = fs.readFileSync("./data/actual_nft.txt", "utf8");
    res.send(actual);
});
app.get('/list', (req, res, next) => {
    res.send('xd');
});

//Run Server
const port = 1337;
app.listen(process.env.PORT || port, () => console.log(chalk.blue(`Listening intently on port ${port}`)));
