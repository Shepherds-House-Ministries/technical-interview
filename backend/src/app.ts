import cors from 'cors';
import express from 'express';
import { volunteersRouter } from './routes/volunteers.js';

export const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/volunteers', volunteersRouter);
