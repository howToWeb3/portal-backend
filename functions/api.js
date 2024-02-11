// inital setup for express server
import userRotes from '../routes/user/index.js';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import express from 'express';
import ServerlessHttp from 'serverless-http';

configDotenv();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/user/', userRotes);

export const handler = ServerlessHttp(app);
