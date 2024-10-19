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
