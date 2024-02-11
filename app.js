// inital setup for express server
import userRoutes from './routes/user/index.js';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import express from 'express';

configDotenv();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
