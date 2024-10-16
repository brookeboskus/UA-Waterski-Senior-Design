const express = require('express');
const router = express.Router();
const db = require('../../db');

module.exports.profile = async (req, res) => {
    db.query('SELECT Fname, Lname, GradYear, MemberType, Major, Phone, Email, CWID FROM User WHERE Email = ?', ['akspencer1@crimson.ua.edu'], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        
        res.status(200).json(results);
    });
};