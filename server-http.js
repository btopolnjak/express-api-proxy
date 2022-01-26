require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const PORT = 5000;

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});