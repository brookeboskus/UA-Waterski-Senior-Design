import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './src/routes/auth.js';
import cors from 'cors';
import csrfTokenRoutes from './pages/api/csrf-token.js';
import db from './db.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const corsOptions = {
    origin: process.env.NEXT_PUBLIC_APP_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'csrf-token'],
    credentials: true,
}

app.use(cookieParser());

app.use(cors(corsOptions)); 
app.use(bodyParser.json());

app.use(csrfTokenRoutes);

app.use('/auth', authRoutes);

app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN'){
        res.status(403).send('CSRF token validation failed');
    } else {
        next(err);
    }
});
