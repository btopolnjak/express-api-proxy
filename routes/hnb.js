import express from 'express';
import needle from 'needle';
import apicache from 'apicache';
import url from 'url';
const router = express.Router();

const HNB_URL = process.env.HNB_URL;

let cache = apicache.middleware

export default router.get('/', cache('5 minutes'), async (req, res) => {
    
    try {

        const params = new URLSearchParams({
            ...url.parse(req.url, true).query
        })

        const apiResponse = await needle('GET', `${HNB_URL}?${params}`);
        const data = apiResponse.body;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error});
    }
})