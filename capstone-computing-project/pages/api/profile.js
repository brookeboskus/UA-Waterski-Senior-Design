// require('dotenv').config();


// const express = require('express');
// const router = express.Router();
// const db = require('../../db');
// const jwt = require('jsonwebtoken');

// const authenticateJWT = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (token == null) {
//         return res.status(401).json({ message: 'Unauthorized, no token provided' });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) {
//             return res.status(403).json({ message: 'Forbidden, invalid token' });
//         }
//         req.user = user;  // attaches user information to request
//         next();
//     });

// };

// // this is the profile route that is used to get the user's profile information
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





// import dotenv from 'dotenv';
// import express from 'express';
// import db from '../../db.js';
// import jwt from 'jsonwebtoken';

// dotenv.config();

// const router = express.Router();

// const authenticateJWT = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (token == null) {
//         return res.status(401).json({ message: 'Unauthorized, no token provided' });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) {
//             return res.status(403).json({ message: 'Forbidden, invalid token' });
//         }
//         req.user = user;  // attaches user information to request
//         next();
//     });
// };

// export const profile = [
//     authenticateJWT,  // runs the JWT middleware to authenticate the user
//     async (req, res) => {
//         const { email } = req.user;  // get email from decoded token

//         db.query('SELECT Fname, Lname, GradYear, MemberType, Major, Phone, Email, CWID, PfpImage FROM User WHERE Email = ?', [email], (err, results) => {
//             if (err) {
//                 return res.status(500).json({ message: 'Database error' });
//             }

//             if (results.length === 0) {
//                 return res.status(404).json({ message: 'User not found' });
//             }

//             let user = results[0];

//             // Convert PfpImage to base64 if it exists
//             if (user.PfpImage) {
//                 const base64Image = user.PfpImage.toString('base64');
//                 user.PfpImage = `data:image/png;base64,${base64Image}`;
//             }

//             res.status(200).json(user);  // returns the user data
//         });
//     }
// ];








import dotenv from 'dotenv';
import express from 'express';
import db from '../../db.js';
import jwt from 'jsonwebtoken';

dotenv.config();

const router = express.Router();

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
        req.user = user;
        next();
    });
};

const profileHandler = async (req, res) => {
    try {
        const { email } = req.user; // get email from decoded token

        db.query('SELECT Fname, Lname, GradYear, MemberType, Major, Phone, Email, CWID, PfpImage FROM User WHERE Email = ?', [email], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database error' });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            let user = results[0];

            // Convert PfpImage to base64 if it exists
            if (user.PfpImage) {
                const base64Image = user.PfpImage.toString('base64');
                user.PfpImage = `data:image/png;base64,${base64Image}`;
            }

            res.status(200).json(user); // returns the user data
        });
    } catch (error) {
        console.error("Error in profile handler:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Wrap `profileHandler` with `authenticateJWT` middleware
const handler = (req, res) => {
    authenticateJWT(req, res, () => profileHandler(req, res));
};

export default handler; // Export as default for Next.js