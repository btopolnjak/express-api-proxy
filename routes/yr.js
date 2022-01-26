const express = require('express');
const router = express.Router();
const needle = require('needle');
const apicache = require('apicache');
const url = require('url');

const YR_URL = process.env.YR_URL;

let cache = apicache.middleware

router.get('/', cache('5 minutes'), async (req, res) => {
    
    try {

        const params = new URLSearchParams({
            ...url.parse(req.url, true).query
        })

        const apiResponse = await needle('GET', `${YR_URL}?${params}`);
        const data = apiResponse.body;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error});
    }
})

module.exports = router;