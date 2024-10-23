require('dotenv').config();

const express = require('express');
const router = express.Router();
const db = require('../../db');
const jwt = require('jsonwebtoken');  

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  

    if (token == null) {
        return res.status(401).json({ message: 'Unauthorized, no token provided' });
    }

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden, invalid token' });
        }
        req.user = user;  // attaches user information to request
        next();
    });
    
};

module.exports.getSetList = async (req, res) => {
    const { startDate, endDate } = req.query;

    // Check if the dates are correctly passed through
    console.log('Start Date:', startDate, 'End Date:', endDate);

    authenticateJWT(req, res, () => {
        // console.log("Validated successfully");
        // const { token } = req.body;
        // console.log("User info");
        // console.log(req.user);
        const cwid = req.user.id;
        console.log(cwid);

        // Dynamically pass the startDate and endDate from the request instead of hardcoded values
        db.query('SELECT SetList.Date, User.Fname, User.Lname, User.Email, User.CWID FROM User INNER JOIN SetList ON User.CWID = SetList.CWID WHERE SetList.Date >= ? AND SetList.Date < ?', 
            [startDate, endDate], 
            (err, results) => {
                if (err) {
                    return res.status(500).json({ message: 'Database error' });
                }
        
                // Log the results to verify how many rows are returned
                console.log('Results from DB:', results);
                // For each item in results, determine if it was registered by the given user
                for (var i = 0; i < results.length; i++) {
                    console.log(results[i].CWID);
                    if (results[i].CWID == cwid) {
                        results[i].RegisteredBy = "you";
                    } else {
                        results[i].RegisteredBy = "someoneElse";
                    }
                    delete results[i].CWID;
                }
                console.log('After delete:', results);
                res.status(200).json(results);
        });
    });
    
};

// module.exports.profile = [
//     authenticateJWT,  // runs the JWT middleware to authenticate the user
//     async (req, res) => {
//         const { email } = req.user;  // return email from decoded token

//         db.query('SELECT Fname, Lname, GradYear, MemberType, Major, Phone, Email, CWID, PfpImage FROM User WHERE Email = ?', [email], (err, results) => {
//             if (err) {
//                 return res.status(500).json({ message: 'Database error' });
//             }

//             if (results.length === 0) {
//                 return res.status(404).json({ message: 'User not found' });
//             }

//             let user = results[0];

//             // need this for blob to appear right on website
//             if (user.PfpImage) {
//                 const base64Image = user.PfpImage.toString('base64');
//                 user.PfpImage = `data:image/png;base64,${base64Image}`;
//             }

//             res.status(200).json(user);  // returns the user
//         });
//     }
// ];

module.exports.registerReservation = async (req, res) => {
    console.log("Attempt to reserve!");

    // In here, we need to get CWID for user. Get this from token
    console.log(req.body);
    const { reserveDate } = req.body;
    // Authenticate user is logged in before allowing reservation
    
    // Getting back 403 on this. Issue with my token?
    authenticateJWT(req, res, () => {
        // console.log("Validated successfully");
        // const { token } = req.body;
        // console.log("User info");
        // console.log(req.user);
        const cwid = req.user.id;
        console.log(cwid);
        console.log(reserveDate);
        const date = new Date(reserveDate);
        console.log(date.toString());
        const dateString = date.getFullYear() + "-" + (date.getMonth() + 1).toString() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":00";
        // return error if date already exists
        const query = 'INSERT INTO SetList (Date, CWID) VALUES (?, ?)';
        db.query(query, [dateString, cwid], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to make reservation' });
            }
            res.json({ message: 'Inserted successfully' });
        });
    });
    
    
    res.status(200);
};

module.exports.deleteReservation = async (req, res) => {
    // Authenticate user is logged in before allowing reservation
    console.log("INSIDE deleteReservation");
    const { reserveDate } = req.body;

    // Authenticate user is logged in before allowing reservation
    // console.log(req.body);
    authenticateJWT(req, res, () => {
        // console.log("Validated successfully");
        // const { token } = req.body;
        // console.log("User info");
        // console.log(req.user);

        // NOTE: Should add check in API here to disallow registrations before current time.

        const cwid = req.user.id;
        console.log(cwid);
        console.log(reserveDate);
        const date = new Date(reserveDate);
        console.log(date.toString());
        const dateString = date.getFullYear() + "-" + (date.getMonth() + 1).toString() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":00";
        // return error if date already exists
        const query = 'DELETE FROM SetList WHERE (Date = ? AND CWID = ?)';
        db.query(query, [dateString, cwid], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete reservation' });
            }
            res.json({ message: 'Deleted successfully' });
        });
    });
    
    
    res.status(200);

    // In here, we need to get CWID for user
    console.log("Attempt to delete!");
    res.status(200);
}

// exports.addMeetingNote = (req, res) => {
//     const { title, content } = req.body;

//     const currentDate = new Date();
//     const formattedDate = currentDate.toISOString().split('T')[0];

//     const query = 'INSERT INTO meeting_notes (title, content, date) VALUES (?, ?, ?)';
//     db.query(query, [title, content, formattedDate], (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to add note' });
//         }
//         res.status(201).json({
//             id: result.insertId,
//             title: title,
//             content: content,
//             date: formattedDate,
//         });
//     });
// };

// exports.deleteMeetingNote = (req, res) => {
//     const { id } = req.params;
//     const query = 'DELETE FROM meeting_notes WHERE id = ?';

//     db.query(query, [id], (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to delete note' });
//         }
//         res.json({ message: 'Note deleted successfully' });
//     });
// };
