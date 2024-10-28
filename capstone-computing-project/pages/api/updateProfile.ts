// page for updating the profile
import type { NextApiRequest, NextApiResponse } from 'next';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../db'); 

// const SECRET_KEY = process.env.JWT_SECRET; 
//we'll need to eventually delete every1 in DB, update login.js to use this SECRET_KEY format. 
// login's token has to be generated from the same jwt token for anywhere else we 
// grab and verify token to actually let a get / post request go through

const SECRET_KEY = 'your_jwt_secret';




const updateUserProfile = async (email: string, payload: any) => {
    return new Promise((resolve, reject) => {
        let query = `UPDATE User SET `;
        const values = [];

        if (payload.Fname) {
            query += `Fname = ?, `;
            values.push(payload.Fname);
        }
        if (payload.Lname) {
            query += `Lname = ?, `;
            values.push(payload.Lname);
        }
        if (payload.GradYear) {
            query += `GradYear = ?, `;
            values.push(payload.GradYear);
        }
        if (payload.Major) {
            query += `Major = ?, `;
            values.push(payload.Major);
        }
        if (payload.Phone) {
            query += `Phone = ?, `;
            values.push(payload.Phone);
        }
        if (payload.Email) {
            query += `Email = ?, `;
            values.push(payload.Email);
        }
        if (payload.CWID) {
            query += `CWID = ?, `;
            values.push(payload.CWID);
        }

        query = query.slice(0, -2); 
        query += ` WHERE Email = ?`;
        values.push(email);

        console.log('Dynamic Query:', query);
        console.log('Values:', values);

        db.query(query, values, (err, results) => {
            if (err) {
                console.error('Database error:', err);
                reject(err);
            } else if (results.affectedRows === 0) {
                reject(new Error('User not found.'));
            } else {
                resolve(results);
            }
        });
    });
};



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; 

        console.log('Token 2:', token);

        if (!token) {
            res.status(401).json({ error: 'Authentication token missing. Please log in again.' });
            return;
        }

        const { payload } = req.body; 

        try {
            console.log("entered try block")
            const decoded = jwt.verify(token, SECRET_KEY);
            console.log('Decoded:', decoded);
            const email = decoded.email;
            console.log('Email:', email);

            await updateUserProfile(email, payload);

            res.status(200).json({ success: true, message: 'Profile updated successfully.' });
        } catch (error) {
            console.error('Error during profile update:', error);
            res.status(400).json({ success: false, error: error.message || 'Invalid or expired token.' });
        }

    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
