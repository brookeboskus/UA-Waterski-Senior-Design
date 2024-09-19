const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../db');  // MySQL connection

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Query to check if the user exists
    db.query('SELECT * FROM User WHERE Email = ?', [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        // Check if the user exists
        if (results.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = results[0];

        // Compare the input password with the stored hashed password
        const validPassword = await bcrypt.compare(password, user.Password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.CWID, email: user.Email }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    });
};
