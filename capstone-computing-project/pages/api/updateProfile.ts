// page for updating the profile
import type { NextApiRequest, NextApiResponse } from 'next';
const db = require('../../db'); 
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

const updateUserProfile = async (email: string, payload: any) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE User 
            SET Fname = ?, Lname = ?, GradYear = ?, Major = ?, Phone = ?, Email = ?, CWID = ?
            WHERE Email = ?
        `;

        const values = [
            payload.Fname,
            payload.Lname,
            payload.GradYear,
            payload.Major,
            payload.Phone,
            payload.Email,
            payload.CWID,
           
        ];

        db.query(query, [...values, email], (err, results) => {
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
        const { token, payload } = req.body; // Expecting payload to have all user profile fields

        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            const email = decoded.email;
            

          

            await updateUserProfile(email, payload);

            res.status(200).json({ success: true, message: 'Profile updated successfully.' });
        } catch (error) {
            console.error('Error during profile update:', error);
            res.status(400).json({ success: false, error: error.message || 'Failed to update profile.' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}