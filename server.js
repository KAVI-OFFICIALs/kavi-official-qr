const express = require('express');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');

const app = express();
const client = new Client();

app.set('view engine', 'ejs');

client.on('qr', (qr) => {
    qrcode.toDataURL(qr, (err, url) => {
        app.get('/', (req, res) => {
            res.render('index', { qrCode: url });
        });
    });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
