const express = require('express');
const router = express.Router();
const db = require('../../db');

module.exports.getSetList = async (req, res) => {
    const { startDate, endDate } = req.query;

    // Check if the dates are correctly passed through
    console.log('Start Date:', startDate, 'End Date:', endDate);

    // Dynamically pass the startDate and endDate from the request instead of hardcoded values
    db.query('SELECT SetList.Date, User.Fname, User.Lname FROM User INNER JOIN SetList ON User.CWID = SetList.CWID WHERE SetList.Date >= ? AND SetList.Date < ?', 
    //b.query('SELECT SetList.Date, SetList.CWID FROM SetList INNER JOIN ON User.CWID = SetList.CWID WHERE SetList.Date >= ? AND SetList.Date < ?',
    [startDate, endDate], 
    (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        // Log the results to verify how many rows are returned
        console.log('Results from DB:', results);
        res.status(200).json(results);
    });
};

module.exports.registerReservation = async (req, res) => {
    // Authenticate user is logged in before allowing reservation
    const { date } = req.body;
    
    // In here, we need to get CWID for user
    console.log("Attempt to reserve!");
    res.status(200);
};

module.exports.deleteReservation = async (req, res) => {
    // Authenticate user is logged in before allowing reservation
    const { date } = req.params;

    // In here, we need to get CWID for user
    console.log("Attempt to delete!");
    res.status(200);
}

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
