// import express from 'express';
// import db from '../../db.js';

// const router = express.Router();

// export const getRoster = async (req, res) => {
//     db.query('SELECT Fname, Lname, GradYear, MemberType, Major, Phone, Email, PfpImage FROM User', (err, results) => {
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




import express from 'express';
import db from '../../db.js';

const router = express.Router();

const getRoster = async (req, res) => {
    db.query('SELECT Fname, Lname, GradYear, MemberType, Major, Phone, Email, PfpImage FROM User', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        const rosterWithImages = results.map(user => {
            if (user.PfpImage) {
                const base64Image = user.PfpImage.toString('base64'); 
                user.PfpImage = `data:image/png;base64,${base64Image}`; 
            }
            return user;
        });

        res.status(200).json(rosterWithImages); 
    });
};



export default getRoster;