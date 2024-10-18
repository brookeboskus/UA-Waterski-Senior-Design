const express = require('express');
const router = express.Router();
const db = require('../../db');

module.exports.getSetList = async (req, res) => {
    const { startDate, endDate } = req.body;

    // Selecting dates registered between startDate and endDate inclusive, along with first and last names
    // Currently hardcoded to Oct 14th-Oct 18th. Struggling to figure out how to make get endpoint that takes params
    db.query('SELECT SetList.Date, User.Fname, User.Lname FROM User INNER JOIN SetList ON User.CWID=SetList.CWID WHERE SetList.Date >= ? AND SetList.Date < ?', ['2024-10-14 00:00:00', '2024-10-18 23:59:59'], (err, results) => {
    //db.query('SELECT SetList.Date, User.Fname, User.Lname FROM User INNER JOIN SetList ON User.CWID=SetList.CWID WHERE SetList.Date >= ? AND SetList.Date < ?', [startDate, endDate], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(200).json(results);
    });
};
