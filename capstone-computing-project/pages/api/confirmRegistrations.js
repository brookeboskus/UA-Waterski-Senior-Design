// pages/api/confirmRegistration.js
import db from '../../db.js';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, action } = req.body;

        try {
            if (action === 'confirm') {
                await db.query('UPDATE User SET isAdminVerified = TRUE WHERE Email = ?', [email]);
                res.status(200).json({ message: 'User confirmed' });
            } else if (action === 'deny') {
                await db.query('DELETE FROM User WHERE Email = ?', [email]);
                res.status(200).json({ message: 'User denied' });
            } else {
                res.status(400).json({ message: 'Invalid action' });
            }
        } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({ message: 'Database error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}