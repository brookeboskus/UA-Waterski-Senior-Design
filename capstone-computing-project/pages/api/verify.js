// import db from '../../db.js';
// let APP_URL = process.env.NEXT_PUBLIC_APP_URL;


// const verify = async (req, res) => {
//     const { token } = req.query;
//     console.log("Token in verify.js:", token);

//     try {
//         const [user] = await db.query('SELECT * FROM User WHERE VerificationToken = ?', [token]);
//         console.log("Query result:", user);

//         if (!user || user.length === 0) { // no user found with the token
//             console.log("Invalid or expired token. Redirecting to failed page...");
//             // THIS IS TEMP
//             // for localhost this flow works fine but deployed is having some issues. 
//             // i believe outlook scans the email for links and our endpoint is being triggered before the user actually clisk the link themselves
//             // which lets the user login, but it leads them to this failed page when they DO click on the link on deployed website
//             // const endpoint = `${APP_URL}verification-failed-page`;
//             // so changing it to success page for now... so failed page doesn't exist rn on deployed
//             const endpoint = `${APP_URL}verification-success-page`;
//             res.redirect(endpoint);
//             return;
//         }

//         console.log("Updating database for verification...");
//         await db.query(
//             'UPDATE User SET IsVerified = ?, VerificationToken = NULL WHERE VerificationToken = ?',
//             [true, token]
//         );
//         console.log("Database updated successfully. Redirecting to success page...");

//         const endpoint = `${APP_URL}verification-success-page`;
//         res.redirect(endpoint);
//     } catch (error) {
//         console.error('Error during email verification:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };


// export default verify;




import db from '../../db.js';
let APP_URL = process.env.NEXT_PUBLIC_APP_URL;

const MAX_ATTEMPTS = 3; 

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

        const { VerificationAttempts } = user[0];

        if (VerificationAttempts >= MAX_ATTEMPTS) {
            console.log("Token has exceeded allowed attempts. Redirecting to failed page...");
            const endpoint = `${APP_URL}verification-failed-page`;
            res.redirect(endpoint);
            return;
        }

        console.log("Updating database for verification...");
        if (VerificationAttempts + 1 < MAX_ATTEMPTS) {
            await db.query(
                'UPDATE User SET VerificationAttempts = VerificationAttempts + 1 WHERE VerificationToken = ?',
                [token]
            );
            console.log("Incremented VerificationAttempts. Token still valid.");
        } else {
            await db.query(
                'UPDATE User SET IsVerified = ?, VerificationToken = NULL, VerificationAttempts = 0 WHERE VerificationToken = ?',
                [true, token]
            );
            console.log("Token invalidated. User verified.");
        }

        const endpoint = `${APP_URL}verification-success-page`;
        res.redirect(endpoint);
    } catch (error) {
        console.error('Error during email verification:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default verify;
