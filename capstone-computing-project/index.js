import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './src/routes/auth.js';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cookieParser());

app.use(bodyParser.json());

app.use('/auth', authRoutes);
