// const db = require('../../db');

// exports.getMeetingNotes = (req, res) => {
//     const query = 'SELECT * FROM meeting_notes ORDER BY date DESC';
//     db.query(query, (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: 'Database query error' });
//         }
//         res.json(results);
//     });
// };

// exports.addMeetingNote = (req, res) => {
//     const { title, content } = req.body;

//     const currentDate = new Date();
//     const formattedDate = currentDate.toISOString().split('T')[0];

//     const query = 'INSERT INTO meeting_notes (title, content, date) VALUES (?, ?, ?)';
//     db.query(query, [title, content, formattedDate], (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to add note' });
//         }
//         res.status(201).json({
//             id: result.insertId,
//             title: title,
//             content: content,
//             date: formattedDate,
//         });
//     });
// };

// exports.deleteMeetingNote = (req, res) => {
//     const { id } = req.params;
//     const query = 'DELETE FROM meeting_notes WHERE id = ?';

//     db.query(query, [id], (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to delete note' });
//         }
//         res.json({ message: 'Note deleted successfully' });
//     });
// };




// import db from '../../db.js';

// export const getMeetingNotes = (req, res) => {
//     const query = 'SELECT * FROM meeting_notes ORDER BY date DESC';
//     db.query(query, (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: 'Database query error' });
//         }
//         res.json(results);
//     });
// };

// export const addMeetingNote = (req, res) => {
//     const { title, content } = req.body;

//     const currentDate = new Date();
//     const formattedDate = currentDate.toISOString().split('T')[0];

//     const query = 'INSERT INTO meeting_notes (title, content, date) VALUES (?, ?, ?)';
//     db.query(query, [title, content, formattedDate], (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to add note' });
//         }
//         res.status(201).json({
//             id: result.insertId,
//             title: title,
//             content: content,
//             date: formattedDate,
//         });
//     });
// };

// export const deleteMeetingNote = (req, res) => {
//     const { id } = req.params;
//     const query = 'DELETE FROM meeting_notes WHERE id = ?';

//     db.query(query, [id], (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to delete note' });
//         }
//         res.json({ message: 'Note deleted successfully' });
//     });
// };








import db from '../../db.js';

export const getMeetingNotes = (req, res) => {
    const query = 'SELECT * FROM meeting_notes ORDER BY date DESC';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(results);
    });
};

export const addMeetingNote = (req, res) => {
    const { title, content } = req.body;

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    const query = 'INSERT INTO meeting_notes (title, content, date) VALUES (?, ?, ?)';
    db.query(query, [title, content, formattedDate], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to add note' });
        }
        res.status(201).json({
            id: result.insertId,
            title: title,
            content: content,
            date: formattedDate,
        });
    });
};

export const deleteMeetingNote = (req, res) => {
    const { id } = req.query;  
    const query = 'DELETE FROM meeting_notes WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete note' });
        }
        res.json({ message: 'Note deleted successfully' });
    });
};

const meetingNotesHandler = (req, res) => {
    if (req.method === 'GET') {
        return getMeetingNotes(req, res);
    } else if (req.method === 'POST') {
        return addMeetingNote(req, res);
    } else if (req.method === 'DELETE') {
        return deleteMeetingNote(req, res);
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default meetingNotesHandler;