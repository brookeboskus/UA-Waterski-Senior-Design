
// this version fixes the db connection issue, switched over to using mysql.createPool
import 'dotenv/config'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../db.js';


const login = async (req, res) => {


    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email, password } = req.body;

    try {
        const [results] = await db.query('SELECT * FROM User WHERE Email = ?', [email]);

        if (results.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = results[0];

        if (!user.IsVerified) {
            return res.status(403).json({ message: 'Please verify your email before logging in.' });
        }
        
        const validPassword = await bcrypt.compare(password, user.Password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password or email' });
        }

        const token = jwt.sign(
            { id: user.CWID, email: user.Email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Unexpected error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

};

export default login;
