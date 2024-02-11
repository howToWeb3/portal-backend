// functions/user/index.js
import userRoutes from '../../routes/user/index.js';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import express from 'express';
import serverless from 'serverless-http';

configDotenv();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', userRoutes);
console.log('api.js', process.env.ENVIRONMENT);
export const handler = serverless(app);
