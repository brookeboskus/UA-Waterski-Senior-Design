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
import csrf from 'csrf';

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

// CSRF token validation function
const validateCsrfToken = (req, res, next) => {
    console.log('Validating CSRF token...');
    const csrfToken = req.headers['csrf-token']; // Expect CSRF token in header
    if (!csrfToken) {
        console.log('CSRF token missing');
        return res.status(403).json({ message: 'CSRF token missing' });
    }

    const csrfProtection = new csrf();

    // Validate the CSRF token using the same secret as for JWT
    if (!csrfProtection.verify(process.env.JWT_SECRET, csrfToken)) {
        console.log('Invalid CSRF token');
        return res.status(403).json({ message: 'Invalid CSRF token' });
    }

    console.log('CSRF token validated successfully');
    next(); // If valid, proceed to the next middleware/route handler
};

// Define routes
router.post('/login', validateCsrfToken, login);
router.post('/signup', upload.single('pfpimage'), validateCsrfToken, signup);
router.get('/roster', checkAuth, getRoster);
router.get('/profile', profile);
router.get('/setlist', getSetList);
router.get('/drivers', drivers);
router.post('/setlist', registerReservation);
router.delete('/setlist', deleteReservation);

router.get('/meetingnotes', getMeetingNotes);
router.post('/meetingnotes', upload.single('file'), addMeetingNote);
router.delete('/meetingnotes/:id', deleteMeetingNote);

router.get('/csrf-token', csrfToken);
// Export router for use in index.js
export default router;