// functions/user/index.js
import userRoutes from '../../routes/user/index.js';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import express from 'express';

configDotenv();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/.netlify/functions/user', userRoutes);

export const handler = async (event, context) => {
    const handler = app;

    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
        handler(event, context, (error, body) => {
            const response = {
                statusCode: error ? 500 : 200,
                body: error ? JSON.stringify({ error: error.message }) : body,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            resolve(response);
        });
    });
};
