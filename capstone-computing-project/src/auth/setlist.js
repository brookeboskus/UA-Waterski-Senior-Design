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

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
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
    console.log("Fetching set list reservations...");
    console.log('Start Date:', startDate, 'End Date:', endDate);

    authenticateJWT(req, res, () => {
        // Get current user's CWID
        const cwid = req.user.id;

        // Dynamically pass the startDate and endDate from the request instead of hardcoded values
        db.query('SELECT SetList.Date, User.Fname, User.Lname, User.Email, User.CWID FROM User INNER JOIN SetList ON User.CWID = SetList.CWID WHERE SetList.Date >= ? AND SetList.Date < ?', 
            [startDate, endDate], 
            (err, results) => {
                if (err) {
                    return res.status(500).json({ message: 'Database error' });
                }
        
                // For each item in results, determine if it was registered by the given user
                for (var i = 0; i < results.length; i++) {
                    if (results[i].CWID == cwid) {
                        results[i].RegisteredBy = "you";
                    } else {
                        results[i].RegisteredBy = "someoneElse";
                    }
                    delete results[i].CWID;
                }
                
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
    console.log("Reservation started");

    const { reserveDate } = req.body;

    // Authenticate user is logged in before allowing reservation
    authenticateJWT(req, res, () => {

        const cwid = req.user.id;
        const date = new Date(reserveDate);

        // Disallow reservation if reservation date is before current time
        if (date < new Date()) {
            return res.status(403).json({ error: 'Failed to create reservation', message: "Cannot make a reservation before the current time!" });
        }

        // Format date string to what database is expecting
        // Could this cause issues if server is deployed in different timezone?
        const dateString = date.getFullYear() + "-" + (date.getMonth() + 1).toString() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":00";
        
        const query = 'INSERT INTO SetList (Date, CWID) VALUES (?, ?)';
        db.query(query, [dateString, cwid], (err, result) => {
            // return error if date already exists
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
    console.log("Reservation cancellation");
    const { reserveDate } = req.body;

    // Authenticate user is logged in before allowing delete of reservation
    authenticateJWT(req, res, () => {

        // NOTE: Should add check in API here to disallow registrations before current time.

        const cwid = req.user.id;
        // console.log(cwid);
        // console.log(reserveDate);
        const date = new Date(reserveDate);

        // Disallow deletion if reservation date is before current time
        if (date < new Date()) {
            return res.status(403).json({ error: 'Failed to delete reservation', message: "Cannot delete a reservation before the current time!" });
        }

        // console.log(date.toString());
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
}
