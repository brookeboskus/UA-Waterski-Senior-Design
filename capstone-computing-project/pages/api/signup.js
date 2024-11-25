import 'dotenv/config';
import bcrypt from 'bcrypt';
import db from '../../db.js';

const signup = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email, password, fname, lname, cwid, phone, gradYear, major, pfpimage } = req.body;

    try {
        // Check if the user already exists
        const [existingUsers] = await db.query('SELECT * FROM User WHERE Email = ?', [email]);

        if (existingUsers && existingUsers.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Convert profile image to a buffer if provided
        const imageBuffer = pfpimage ? Buffer.from(pfpimage, 'base64') : null;

        // Insert the new user into the database
        await db.query(
            `INSERT INTO User (Email, Password, Fname, Lname, CWID, Phone, GradYear, Major, PfpImage) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [email, hashedPassword, fname, lname, cwid, phone, gradYear, major, imageBuffer]
        );

        res.status(201).json({ message: 'Signup successful!' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default signup;
