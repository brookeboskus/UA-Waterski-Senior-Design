
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './src/routes/auth.js';
import cors from 'cors';
import csrf from 'csrf';
import db from './db.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());

app.use(cors()); 
app.use(bodyParser.json());

// Initialize CSRF protection
// const csrfMiddleware = csrfProtection({
//     // Customize settings here if needed, such as error handling
//     cookie: { httpOnly: true, secure: process.env.NODE_ENV === 'production' },  // Secure cookies
// });

const tokens = new csrf();


//const csrfMiddleware = csrf();

app.get('/api/csrf-token', (req, res) => {
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

const PORT = 3008       ; //localhost
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});