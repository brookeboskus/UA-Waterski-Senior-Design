// v3
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const multer = require('multer');
const db = require('../../db'); 

const upload = multer({ storage: multer.memoryStorage() });

exports.getMeetingNotes = (req, res) => {
    const query = 'SELECT * FROM meeting_notes ORDER BY date DESC';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(results); 
    });
};


exports.addMeetingNote = async (req, res) => {
    const { title, content } = req.body;
    let parsedText = content;

    if (req.file && req.file.mimetype === 'application/pdf') {
        try {
            const data = await pdfParse(req.file.buffer);
            parsedText = data.text;
        } catch (err) {
            return res.status(500).json({ message: 'Error parsing PDF' });
        }
    }

    const currentDate = new Date(); 
    const formattedDate = currentDate.toISOString().split('T')[0]; 

    const query = 'INSERT INTO meeting_notes (title, content, date) VALUES (?, ?, ?)';
    db.query(query, [title, parsedText, formattedDate], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to add note' });
        }
        res.status(201).json({
            id: result.insertId,
            title: title,
            content: parsedText,
            date: formattedDate, 
        });
    });
};


exports.deleteMeetingNote = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM meeting_notes WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete note' });
        }
        res.json({ message: 'Note deleted successfully' });
    });
};

