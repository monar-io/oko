const express = require('express');
const app = express();
const path = require('path');
const fs = require("fs");
const rp = require("request-promise");
const cors = require('cors')
const https = require('https');
const { exec } = require('child_process');

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(cors());
app.use(express.json());

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/actual', (req, res, next) => {
    const actual = fs.readFileSync("./data/actual_nft.txt", "utf8");
    res.send(actual);
});
app.get('/list', async (req, res, next) => {
    const apiKey = fs.readFileSync("./data/api_key.txt", "utf8");
    const userId = fs.readFileSync("./data/user_id.txt", "utf8");
    const list = await rp({
        method: 'GET',
        uri: `https://content.dev.monar.io/artist/${userId}`,
        headers: {
            "x-api-key": apiKey,
        },
        json: true
    });
    res.send(list);
});
app.post('/select', async (req, res, next) => {
    fs.writeFileSync('./data/actual_nft.txt', `${req.body.id} - ${req.body.name} - ${req.body.description}`);
    const file = fs.createWriteStream("file.jpg");
    https.get(req.body.ipfs, function (response) {
        // run feh to display image
        response.pipe(file);
        exec('feh -F file.jpg', (err, stdout, stderr) => {
            if (err) {
                console.error("couldn't display", err);
            }
            res.send({});
        });
    });
});

const port = 1337;
app.listen(process.env.PORT || port, () => console.log(`Listening intently on port ${port}`));
