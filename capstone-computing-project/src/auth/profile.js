const bcrypt = require('bcrypt');
const db = require('../../db');  // MySQL connection

module.exports.profile = async (req, res) => {
    const { email } = req.body;  // Assuming the user provides the email

    // Query to get user information
    db.query('SELECT * FROM User WHERE Email = ?', [email], async (err, results) => {
        if (err) {
            console.log("database error");

            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database error' });
          
        }

        // Check if the user exists
        if (results.length === 0) {
            console.log("user not found");
            return res.status(404).json({ message: 'User not found' });
            
        }

        const user = results[0];
        res.status(200).json({
            fname: user.FirstName,
            lname: user.LastName,
            cwid: user.CWID,
            phone: user.Phone,
            email: user.Email,
            gradYear: user.GradYear,
            major: user.Major
        });
    });
};
