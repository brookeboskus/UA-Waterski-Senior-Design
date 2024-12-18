// pages/api/pendingRegistrations.js
import db from '../../db.js';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const [results] = await db.query('SELECT * FROM User WHERE isAdminVerified = FALSE');
            res.status(200).json(results);
        } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({ message: 'Database error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}