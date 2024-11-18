// const express = require('express');
// const multer = require('multer');
// const router = express.Router();
// const { login } = require('../../pages/api/login.js');
// const { signup } = require('../../pages/api/signup.js');

// const { getRoster } = require('../../pages/api/roster.js');
// const { getSetList, registerReservation, deleteReservation } = require('../../pages/api/setlist.js');
// const { profile } = require('../../pages/api/profile.js');
// const { getMeetingNotes, addMeetingNote, deleteMeetingNote } = require('../../pages/api/meetingnotes.js');

// // multer is the middleware for handling file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// const checkAuth = (req, res, next) => {
//     // console.log('Checking authentication for Express routes');

//     const authHeader = req.headers['authorization'];
//     if (!authHeader) {
//         return res.redirect('/login-page');
//     }

//     const token = authHeader.split(' ')[1];
//     if (!token) {
//         return res.redirect('/login-page');
//     }


//     next();
// };


// router.post('/login', login);
// router.post('/signup', upload.single('pfpimage'), signup);
// router.get('/roster', checkAuth, getRoster);
// router.get('/profile', profile);
// router.get('/setlist', getSetList);
// router.post('/setlist', registerReservation);
// router.delete('/setlist', deleteReservation);

// router.get('/meetingnotes', getMeetingNotes);
// router.post('/meetingnotes', upload.single('file'), addMeetingNote);
// router.delete('/meetingnotes/:id', deleteMeetingNote);

// module.exports = router;






import express from 'express';
import multer from 'multer';
import login from '../../pages/api/login.js';
import signup from '../../pages/api/signup.js';
import getRoster from '../../pages/api/roster.js';
import { getSetList, registerReservation, deleteReservation } from '../../pages/api/setlist.js';
import profile from '../../pages/api/profile.js';
import drivers from '../../pages/api/drivers.js';
import { getMeetingNotes, addMeetingNote, deleteMeetingNote } from '../../pages/api/meetingnotes.js';
import csrfToken from '../../pages/api/csrf-token.js';

const router = express.Router();

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to check authentication
const checkAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.redirect('/login-page');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.redirect('/login-page');
    }

    next();
};

// Define routes
router.post('/login', login);
router.post('/signup', upload.single('pfpimage'), signup);
router.get('/roster', checkAuth, getRoster);
router.get('/profile', profile);
router.get('/setlist', getSetList);
router.get('/drivers', drivers);
router.post('/setlist', registerReservation);
router.delete('/setlist', deleteReservation);

router.get('/meetingnotes', getMeetingNotes);
router.post('/meetingnotes', upload.single('file'), addMeetingNote);
router.delete('/meetingnotes/:id', deleteMeetingNote);

//router.get('/csrf-token', getCSRFToken);
// Export router for use in index.js
export default router;