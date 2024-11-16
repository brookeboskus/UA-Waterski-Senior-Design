// import express from 'express';
// import db from '../../db.js';

// const router = express.Router();

// const getRoster = async (req, res) => {
//     db.query('SELECT Fname, Lname, GradYear, MemberType, Major, Phone, Email, PfpImage, SlalomDriver, TrickDriver, JumpDriver FROM User', (err, results) => {
//         if (err) {
//             return res.status(500).json({ message: 'Database error' });
//         }

//         const rosterWithImages = results.map(user => {
//             if (user.PfpImage) {
//                 const base64Image = user.PfpImage.toString('base64'); 
//                 user.PfpImage = `data:image/png;base64,${base64Image}`; 
//             }
//             return user;
//         });

//         res.status(200).json(rosterWithImages); 
//     });
// };



// export default getRoster;


import express from 'express';
import db from '../../db.js';

const router = express.Router();

const getRoster = async (req, res) => {
    try {
        const [results] = await db.query('SELECT Fname, Lname, GradYear, MemberType, Major, Phone, Email, PfpImage, SlalomDriver, TrickDriver, JumpDriver FROM User');

        const rosterWithImages = results.map(user => {
            if (user.PfpImage) {
                const base64Image = user.PfpImage.toString('base64'); 
                user.PfpImage = `data:image/png;base64,${base64Image}`; 
            }
            return user;
        });

        res.status(200).json(rosterWithImages); 
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Database error' });
    }
};

export default getRoster;
