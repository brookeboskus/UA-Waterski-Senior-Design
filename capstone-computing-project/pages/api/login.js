// import 'dotenv/config'; 
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import db from '../../db.js';

// const login = async (req, res) => {

//     if (req.method !== 'POST') {
//         return res.status(405).json({ message: 'Method Not Allowed' });
//     }

//     const { email, password } = req.body;
//     console.log('req.body for login:', req.body);

//     try {
//         db.query('SELECT * FROM User WHERE Email = ?', [email], async (err, results) => {
//             if (err) {
//                 console.error('Database query error:', err);
//                 return res.status(500).json({ message: 'Database query error' });
//             }

//             if (results.length === 0) {
//                 return res.status(400).json({ message: 'User not found' });
//             }

//             const user = results[0];
//             const validPassword = await bcrypt.compare(password, user.Password);
//             if (!validPassword) {
//                 return res.status(400).json({ message: 'Invalid password or email' });
//             }

//             const token = jwt.sign(
//                 { id: user.CWID, email: user.Email },
//                 process.env.JWT_SECRET,
//                 { expiresIn: '1h' }
//             );

//             res.status(200).json({ message: 'Login successful', token });
//         });
//     } catch (error) {
//         console.error('Unexpected error during login:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };



// export default login;



// import 'dotenv/config'; 
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import db from '../../db.js';

// const login = async (req, res) => {

//     if (req.method !== 'POST') {
//         return res.status(405).json({ message: 'Method Not Allowed' });
//     }

//     const { email, password } = req.body;
//     console.log('req.body for login:', req.body);

//     try {
//         db.query('SELECT * FROM User WHERE Email = ?', [email], async (err, results) => {
//             if (err) {
//                 console.error('Database query error:', err);
//                 db.end(); // close connection on error
//                 return res.status(500).json({ message: 'Database query error' });
//             }

//             if (results.length === 0) {
//                 db.end(); // close connection when no user is found
//                 return res.status(400).json({ message: 'User not found' });
//             }

//             const user = results[0];
//             const validPassword = await bcrypt.compare(password, user.Password);
//             if (!validPassword) {
//                 db.end(); // close connection on invalid password
//                 return res.status(400).json({ message: 'Invalid password or email' });
//             }

//             const token = jwt.sign(
//                 { id: user.CWID, email: user.Email },
//                 process.env.JWT_SECRET,
//                 { expiresIn: '1h' }
//             );

//             res.status(200).json({ message: 'Login successful', token });
//             db.end(); // close connection after successful login
//         });
//     } catch (error) {
//         console.error('Unexpected error during login:', error);
//         db.end(); // close connection on unexpected error
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// export default login;





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
    console.log('req.body for login:', req.body);

    try {
        const [results] = await db.query('SELECT * FROM User WHERE Email = ?', [email]);

        if (results.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = results[0];
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
