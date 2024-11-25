import db from '../../db.js';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

const verify = async (req, res) => {
    const { token } = req.query;

    try {
        const [user] = await db.query('SELECT * FROM User WHERE VerificationToken = ?', [token]);

        if (!user || user.length === 0) {
            return res.redirect(`${APP_URL}/verification-failed-page`);

            // return res.status(400).json({ message: 'Invalid or expired token' });
        }

        await db.query('UPDATE User SET IsVerified = ?, VerificationToken = NULL WHERE VerificationToken = ?', [true, token]);

        res.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/verification-success-page`);

        // res.status(200).json({ message: 'Email verified successfully!' });
    } catch (error) {
        console.error('Error during email verification:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default verify;
