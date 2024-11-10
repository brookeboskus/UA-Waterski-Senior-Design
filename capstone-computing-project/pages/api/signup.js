// v1
// const bcrypt = require('bcrypt');
// const db = require('../../db');

// module.exports.signup = async (req, res) => {
//     const { email, password, fname, lname, cwid, phone, gradYear, major } = req.body;
//     const pfpimage = req.file ? req.file.buffer : null; 

//     // Check if the user already exists
//     db.query('SELECT * FROM User WHERE Email = ?', [email], async (err, results) => {
//         if (err) {
//             console.error('Database query error:', err);
//             return res.status(500).json({ message: 'Database error' });
//         }

//         // Check if the email already exists
//         if (results && results.length > 0) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         try {
//             // Hash the password
//             const salt = await bcrypt.genSalt(10);
//             const hashedPassword = await bcrypt.hash(password, salt);

//             // Insert the new user into the database
//             db.query(
//                 `INSERT INTO User (Email, Password, Fname, Lname, CWID, Phone, GradYear, Major, PfpImage) 
//                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//                 [email, hashedPassword, fname, lname, cwid, phone, gradYear, major, pfpimage],
//                 (err, result) => {
//                     if (err) {
//                         console.error('Database insert error:', err);
//                         return res.status(500).json({ message: 'Database error' });
//                     }
//                     res.status(201).json({ message: 'Signup successful!' });

//                 }
//             );
//         } catch (err) {
//             console.error('Hashing error:', err);
//             res.status(500).json({ message: 'Server error' });
//         }
//     });
// };




// v2 don't use v2
// require('dotenv').config();
// const bcrypt = require('bcrypt');
// const db = require('../../db');

// const signup = async (req, res) => {
//     if (req.method !== 'POST') {
//         return res.status(405).json({ message: 'Method Not Allowed' });
//     }

//     const { email, password, fname, lname, cwid, phone, gradYear, major } = req.body;
//     console.log('req.body for signup:', req.body);
//     console.log('password before pfpimage line:', password)
//     const pfpimage = req.file ? req.file.buffer : null;
//     console.log('password after pfpimage line:', password)

//     try {
//         console.log('password at try block 1:', password);
//         db.query('SELECT * FROM User WHERE Email = ?', [email], async (err, results) => {
//             if (err) {
//                 console.error('Database query error:', err);
//                 return res.status(500).json({ message: 'Database error' });
//             }

//             if (results && results.length > 0) {
//                 return res.status(400).json({ message: 'User already exists' });
//             }

//             try {
//                 console.log('password at try block 2:', password);
//                 const salt = await bcrypt.genSalt(10);
//                 console.log("Password received:", password);
//                 const hashedPassword = await bcrypt.hash(password, salt);

//                 db.query(
//                     `INSERT INTO User (Email, Password, Fname, Lname, CWID, Phone, GradYear, Major, PfpImage) 
//                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//                     [email, hashedPassword, fname, lname, cwid, phone, gradYear, major, pfpimage],
//                     (err, result) => {
//                         if (err) {
//                             console.error('Database insert error:', err);
//                             return res.status(500).json({ message: 'Database error' });
//                         }
//                         res.status(201).json({ message: 'Signup successful!' });
//                     }
//                 );
//             } catch (err) {
//                 console.error('Hashing error:', err);
//                 res.status(500).json({ message: 'Server error' });
//             }
//         });
//     } catch (error) {
//         console.error('Unexpected error during signup:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// export default signup;





// v3 allows signup in frontend to work now (besides pfpimage for now)
require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('../../db');

const signup = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email, password, fname, lname, cwid, phone, gradYear, major, pfpimage } = req.body;
    console.log('req.body for signup:', req.body);

    try {
        db.query('SELECT * FROM User WHERE Email = ?', [email], async (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).json({ message: 'Database error' });
            }

            if (results && results.length > 0) {
                return res.status(400).json({ message: 'User already exists' });
            }

            try {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                db.query(
                    `INSERT INTO User (Email, Password, Fname, Lname, CWID, Phone, GradYear, Major, PfpImage) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [email, hashedPassword, fname, lname, cwid, phone, gradYear, major, pfpimage],
                    (err, result) => {
                        if (err) {
                            console.error('Database insert error:', err);
                            return res.status(500).json({ message: 'Database error' });
                        }
                        res.status(201).json({ message: 'Signup successful!' });
                    }
                );
            } catch (err) {
                console.error('Hashing error:', err);
                res.status(500).json({ message: 'Server error' });
            }
        });
    } catch (error) {
        console.error('Unexpected error during signup:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default signup;