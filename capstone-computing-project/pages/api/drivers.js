import express from 'express';
import db from '../../db.js';

const router = express.Router();

const getDrivers = async (req, res) => {
    try {
        //Query for users who are approves drivers
        const [slalomDrivers] = await db.query(
            `SELECT Fname, Lname
            FROM User 
            WHERE SlalomDriver = 'approved'`
        );

        //Return list of approved drivers
        res.status(200).jsoon(slalomDrivers);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({message: 'Failed to fetch drivers'});
    }
};

//router.get('/drivers', getDrivers);

export default getDrivers;