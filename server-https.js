require('dotenv').config();
const express = require('express');
const https = require('https');
const cors = require('cors');
const fs = require('fs');
const privateKey = fs.readFileSync(process.env.PRIVKEY);
const certificate = fs.readFileSync(process.env.FULLCHAIN);
const rateLimit = require('express-rate-limit');

// Use port from .env file or 443 (HTTPS)
const PORT = process.env.PORT || 443;

const app = express()

// Limit rate
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10
})
app.use(limiter);
app.set('trust proxy', 1);

// Route definitions
app.use('/hnb', require('./routes/hnb'));
app.use('/yr', require('./routes/yr'));

// Use CORS
app.use(cors());

https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});