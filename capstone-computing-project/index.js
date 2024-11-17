
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './src/routes/auth.js';
import cors from 'cors';
import csrf from 'csrf';
import db from './db.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const corsOptions = {
    //origin: process.env.NEXT_PUBLIC_APP_URL,
    origin: 'https://brooke.uawaterski.com',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'csrf-token'],
    credentials: true,
}

app.use(cookieParser());

app.use(cors(corsOptions)); 
app.use(bodyParser.json());

// Initialize CSRF protection
// const csrfMiddleware = csrfProtection({
//     // Customize settings here if needed, such as error handling
//     cookie: { httpOnly: true, secure: process.env.NODE_ENV === 'production' },  // Secure cookies
// });

const token = new csrf();


//const csrfMiddleware = csrf();

app.get('/api/csrf-token', (req, res) => {
    console.log("CSRF token request received");
    const csrfToken = token.create(process.env.JWT_SECRET);
    res.json({ csrfToken});
});

app.use('/auth', authRoutes);

app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN'){
        res.status(403).send('CSRF token validation failed');
    } else {
        next(err);
    }
});

const PORT = 3000; //localhost
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});