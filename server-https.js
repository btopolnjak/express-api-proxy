import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import https from 'https';
import fs from 'fs';
const privateKey = fs.readFileSync(process.env.PRIVKEY);
const certificate = fs.readFileSync(process.env.FULLCHAIN);

// Routes import
import hnb from './routes/hnb.js';
import yr from './routes/yr.js';

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

// Use CORS
app.use(cors());

// Route definitions
app.use('/hnb', hnb);
app.use('/yr', yr);


https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});