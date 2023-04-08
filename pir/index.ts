import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const bodyParser = require('body-parser').json();
const sample = require('lodash/sample');

const app: Express = express();
app.use(bodyParser);
const port = process.env.PORT;

import type { Bucket } from '@blyss/sdk';
const blyss = require('@blyss/sdk/node');
process.removeAllListeners('warning');

async function main() {
    const bucket: Bucket = await blyss.Bucket.initializeLocal(
        'http://localhost:8008'
    );

    app.get('/', (req: Request, res: Response) => {
        res.send('Express + TypeScript Server');
    });

    app.get('/ad', async (req: Request, res: Response) => {
        const adCategory = req.query.category as string;
        const result = await bucket.privateRead(adCategory) as String[];
        res.json({result: sample(result)})
    });

    app.listen(port, () => {
        console.log(`⚡️[server]: PIR Server is running at http://localhost:${port}`);
    });
}

main();

