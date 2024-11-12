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
import db from './db.js';

const app = express();

app.use(cors()); 
app.use(bodyParser.json());

app.use('/auth', authRoutes);

const PORT = 4000; //localhost
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});