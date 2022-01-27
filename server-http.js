import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import hnb from './routes/hnb.js';
import yr from './routes/yr.js';

const PORT = 5000;

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


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});