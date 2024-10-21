const express = require('express');
const multer = require('multer');
const router = express.Router();
const { login } = require('../auth/login');
const { signup } = require('../auth/signup');
const { getRoster } = require('../auth/roster');
const { getSetList } = require('../auth/setlist');
const { profile } = require('../auth/profile');
const { getMeetingNotes, addMeetingNote, deleteMeetingNote } = require('../auth/meetingnotes');


console.log({
    login,
    signup,
    getRoster,
    getSetList,
    profile,
    getMeetingNotes,
    addMeetingNote,
    deleteMeetingNote
});


// multer is the middleware for handling file uploads
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

router.post('/login', login);
router.post('/signup', upload.single('pfpimage'), signup); 
router.get('/roster', getRoster);
router.get('/profile', profile);
router.get('/setlist', getSetList);
router.get('/meetingnotes', getMeetingNotes);
router.post('/meetingnotes', upload.single('file'), addMeetingNote); 
router.delete('/meetingnotes/:id', deleteMeetingNote);

module.exports = router;
