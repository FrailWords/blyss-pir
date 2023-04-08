import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const bodyParser = require('body-parser');
const jsonBodyParser = bodyParser.json!!();
const formBodyParser = bodyParser.urlencoded!!({extended: true});

const app: Express = express();
app.use(jsonBodyParser, formBodyParser);
const port = process.env.PORT;

const path = require('path');
const ads_dir = path.join(__dirname, 'ads');
app.use(express.static(ads_dir));

import type { Bucket } from '@blyss/sdk';
const blyss = require('@blyss/sdk/node');
process.removeAllListeners('warning');

async function main() {
    const bucket: Bucket = await blyss.Bucket.initializeLocal(
        'http://localhost:8008'
    );

    // Write some data to it
    await bucket.write({
        health: [],
        electronics: [],
        finance: []
    });

    app.get('/', (req: Request, res: Response) => {
        res.send('Express + TypeScript Server');
    });

    app.get('/clear', async (req: Request, res: Response) => {
        await bucket.destroyEntireBucket();
        res.json()
    });

    app.post('/ad', async (req: Request, res: Response) => {
        const adCategory = req.query.category as string;
        const image = req.body.img;
        if (adCategory && image) {
            const result = (await bucket.privateRead(adCategory.toLowerCase())) as string[] || [];
            result.push(`http://localhost:8002/${adCategory.toLowerCase()}/${image}`);
            await bucket.write({
                [adCategory.toLowerCase()]: result
            })
            res.json({result})
        }
        res.status(400);
    });

    app.listen(port, () => {
        console.log(`⚡️[server]: Ad Server is running at http://localhost:${port}`);
    });
}

main();

