// inital setup for express server
import cors from 'cors';
import express from 'express';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    console.log('test');
    res.send('test');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
