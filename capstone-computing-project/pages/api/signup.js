const bcrypt = require('bcrypt');
const db = require('../../db');  

module.exports.signup = async (req, res) => {
    const { email, password, fname, lname, cwid, phone, gradYear, major } = req.body;
    const pfpimage = req.file ? req.file.buffer : null; 

    // Check if the user already exists
    db.query('SELECT * FROM User WHERE Email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        // Check if the email already exists
        if (results && results.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        try {
            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Insert the new user into the database
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
};
