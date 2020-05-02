import express, { json } from 'express';
import cors from 'cors';
import { StreamChat } from 'stream-chat';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const { PORT, STREAM_API_KEY, STREAM_API_SECRET } = process.env;

app.set('port', PORT);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const serverSideClient = new StreamChat(STREAM_API_KEY, STREAM_API_SECRET);

app.post('/join', async(req, res) => {
    const { username } = req.body;

    const token = serverSideClient.createToken(username);

    return res.status(200).json({ user: { username }, token });
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

export default app;
