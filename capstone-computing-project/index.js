// // very important file. 

// const express = require('express');
// const bodyParser = require('body-parser');
// const authRoutes = require('./src/routes/auth');
// const cors = require('cors'); // Cross-Origin requests
// const db = require('./db');

// const app = express();

// app.use(cors()); 
// app.use(bodyParser.json()); 

// app.use('/auth', authRoutes);

// const PORT = 4000; //localhost
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });





import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './src/routes/auth.js';
import cors from 'cors';
import csrf from 'express-csrf-protect';
import db from './db.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());

app.use(cors()); 
app.use(bodyParser.json());

const csrfMiddleware = csrfProtection();

//app.use(csrfProtection);

app.get('/api/csrf-token', csrfMiddleware, (req, res) => {
    res.json({ csrfToken: req.csrfToken()});
});

// app.get('/form', (req, res) => {
//     res.send(
//         <form action="/submit" method="POST">
//             <input type="text" name="username" required />
//             <input type="hidden" name="_csrf" value="${req.csrfToken()}"/>
//             <button type="submit">Submit</button>
//         </form>
//     )
// })

// // Example POST route that handles form submission
// app.post('/submit', (req, res) => {
//     const { username } = req.body;
//     res.send(`Hello, ${username}`);
// });

app.use('/auth', authRoutes);

app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN'){
        res.status(403).send('CSRF token validation failed');
    } else {
        next(err);
    }
});

const PORT = 3001; //localhost
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});