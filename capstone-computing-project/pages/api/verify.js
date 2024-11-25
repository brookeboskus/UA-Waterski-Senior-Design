import db from '../../db.js';
let APP_URL = process.env.NEXT_PUBLIC_APP_URL;


// const verify = async (req, res) => {
//     const { token } = req.query;
//     console.log("token in verify.js:", token);

//     try {
//         const [user] = await db.query('SELECT * FROM User WHERE VerificationToken = ?', [token]);

//         if (!user || user.length === 0) {
//             // return res.redirect(`${APP_URL}/verification-failed-page`);
//             const endpoint = `${APP_URL}verification-failed-page`;
//             // return res.redirect(endpoint);
//             res.redirect(endpoint); 
//             return;


//             // return res.status(400).json({ message: 'Invalid or expired token' });
//         }

//         await db.query('UPDATE User SET IsVerified = ?, VerificationToken = NULL WHERE VerificationToken = ?', [true, token]);

//         // res.redirect(`${APP_URL}/verification-success-page`);
//         const endpoint = `${APP_URL}verification-success-page`;
//         // return res.redirect(endpoint);
//         res.redirect(endpoint);

//         return;
        
//         // res.status(200).json({ message: 'Email verified successfully!' });
//     } catch (error) {
//         console.error('Error during email verification:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };


const verify = async (req, res) => {
    const { token } = req.query;
    console.log("Token in verify.js:", token);

    try {
        const [user] = await db.query('SELECT * FROM User WHERE VerificationToken = ?', [token]);
        console.log("Query result:", user);

        if (!user || user.length === 0) {
            console.log("Invalid or expired token. Redirecting to failed page...");
            const endpoint = `${APP_URL}verification-failed-page`;
            res.redirect(endpoint);
            return;
        }

        if (user[0].IsVerified) {
            console.log("User already verified. Redirecting to success page...");
            const endpoint = `${APP_URL}verification-success-page`;
            res.redirect(endpoint);
            return;
        }

        console.log("Updating database for verification...");
        await db.query(
            'UPDATE User SET IsVerified = ?, VerificationToken = NULL WHERE VerificationToken = ?',
            [true, token]
        );
        console.log("Database updated successfully. Redirecting to success page...");

        const endpoint = `${APP_URL}verification-success-page`;
        res.redirect(endpoint);
    } catch (error) {
        console.error('Error during email verification:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default verify;



export default verify;
