const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../db'); 

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM User WHERE Email = ?', [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = results[0];
        const validPassword = await bcrypt.compare(password, user.Password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // generates a JWT token and send it to the client //need to figure out how to use .env and bring it in here
        const token = jwt.sign({ id: user.CWID, email: user.Email }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    });
};

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.user = user; // Attach the user info to the request
        next();
    });
};