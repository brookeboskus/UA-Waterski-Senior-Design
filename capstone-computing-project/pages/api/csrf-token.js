import express from 'express';
import csrf from 'csrf';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
//const app = express;

const csrfToken = new csrf();

// CSRF token route to send token to the client
router.get('/api/csrf-token', (req, res) => {
    console.log('CSRF token request received');
    
    try {
        // Generate CSRF token using the secret
        const token = csrfToken.create(process.env.JWT_SECRET);
        res.status(200).json({ csrfToken: token }); // Send token in response
    } catch (err) {
        console.error('Error generating CSRF token:', err);
        res.status(500).json({ message: 'Failed to generate CSRF token' });
    }
});

export default router;  // Export the router so it can be used in the main app