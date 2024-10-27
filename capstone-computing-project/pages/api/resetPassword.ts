// // page 4 for forgot password, this one handles updating the password in db


import type { NextApiRequest, NextApiResponse } from 'next';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../db'); 

const SECRET_KEY = process.env.JWT_SECRET;

const updateUserPassword = async (email: string, hashedPassword: string) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE User SET Password = ? WHERE Email = ?';

        db.query(query, [hashedPassword, email], (err, results) => {
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
        const { token, newPassword } = req.body;

        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            const email = decoded.email;

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await updateUserPassword(email, hashedPassword);

            res.status(200).json({ success: true, message: 'Password reset successfully.' });
            
        } catch (error) {
            console.error('Error during password reset:', error);
            res.status(400).json({ success: false, error: error.message || 'Invalid or expired token.' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}