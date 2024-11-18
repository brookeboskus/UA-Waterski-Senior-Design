import express from 'express';
import db from '../../db.js';

const router = express.Router();

const getDrivers = async (req, res) => {
    try {
        //Query for users who are approves drivers
        const [slalomDrivers] = await db.query(
            `SELECT Fname, Lname
            FROM User 
            WHERE SlalomDriver = 'Yes'`
        );

        const [trickDrivers] = await db.query(
            `SELECT Fname, Lname
            FROM User 
            WHERE TrickDriver = 'Yes'`
        );

        const [jumpDrivers] = await db.query(
            `SELECT Fname, Lname
            FROM User 
            WHERE JumpDriver = 'Yes'`
        );

        //Return list of approved drivers
        res.status(200).json({slalomDrivers, trickDrivers, jumpDrivers });

    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({message: 'Failed to fetch drivers'});
    }
};

//router.get('/drivers', getDrivers);

export default getDrivers;