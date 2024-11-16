
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
//         req.user = user;
//         next();
//     });
// };

// const getSetList = async (req, res) => {
//     const { startDate, endDate } = req.query;
//     console.log("Fetching set list reservations...");

//     authenticateJWT(req, res, () => {
//         const cwid = req.user.id;
//         db.query(
//             'SELECT SetList.Date, User.Fname, User.Lname, User.Email, User.CWID FROM User INNER JOIN SetList ON User.CWID = SetList.CWID WHERE SetList.Date >= ? AND SetList.Date < ?',
//             [startDate, endDate],
//             (err, results) => {
//                 if (err) {
//                     return res.status(500).json({ message: 'Database error' });
//                 }

//                 results.forEach(result => {
//                     result.RegisteredBy = result.CWID === cwid ? "you" : "someoneElse";
//                     delete result.CWID;
//                 });

//                 res.status(200).json(results);
//             }
//         );
//     });
// };

// const registerReservation = async (req, res) => {
//     console.log("Reservation started");
//     const { reserveDate } = req.body;


//     const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//     console.log("Server timezone:", timezone);


//     authenticateJWT(req, res, () => {
//         const cwid = req.user.id;
//         const date = new Date(reserveDate);

//         if (date < new Date()) {
//             return res.status(403).json({ error: 'Failed to create reservation', message: "Cannot make a reservation before the current time!" });
//         }

//         const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:00`;
//         console.log("Date string:", dateString);

//         const query = 'INSERT INTO SetList (Date, CWID) VALUES (?, ?)';

//         db.query(query, [dateString, cwid], (err, result) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Failed to make reservation' });
//             }
//             res.json({ message: 'Inserted successfully' });
//         });
//     });
// };


// const deleteReservation = async (req, res) => {
//     console.log("Reservation cancellation");
//     const { reserveDate } = req.body;

//     authenticateJWT(req, res, () => {
//         const cwid = req.user.id;
//         const date = new Date(reserveDate);

//         if (date < new Date()) {
//             return res.status(403).json({ error: 'Failed to delete reservation', message: "Cannot delete a reservation before the current time!" });
//         }

//         const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:00`;
//         const query = 'DELETE FROM SetList WHERE (Date = ? AND CWID = ?)';

//         db.query(query, [dateString, cwid], (err, result) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Failed to delete reservation' });
//             }
//             res.json({ message: 'Deleted successfully' });
//         });
//     });
// };

// const setlistHandler = (req, res) => {
//     if (req.method === 'GET') {
//         return getSetList(req, res);
//     } else if (req.method === 'POST') {
//         return registerReservation(req, res);
//     } else if (req.method === 'DELETE') {
//         return deleteReservation(req, res);
//     } else {
//         res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// };

// export { getSetList, registerReservation, deleteReservation };
// export default setlistHandler;




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

const getSetList = async (req, res) => {
    const { startDate, endDate } = req.query;
    console.log("Fetching set list reservations...");

    try {
        authenticateJWT(req, res, async () => {
            const cwid = req.user.id;
            const [results] = await db.query(
                'SELECT SetList.Date, User.Fname, User.Lname, User.Email, User.CWID FROM User INNER JOIN SetList ON User.CWID = SetList.CWID WHERE SetList.Date >= ? AND SetList.Date < ?',
                [startDate, endDate]
            );

            results.forEach(result => {
                result.RegisteredBy = result.CWID === cwid ? "you" : "someoneElse";
                delete result.CWID;
            });

            res.status(200).json(results);
        });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Database error' });
    }
};

const registerReservation = async (req, res) => {
    console.log("Reservation started");
    const { reserveDate } = req.body;

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log("Server timezone:", timezone);

    try {
        authenticateJWT(req, res, async () => {
            const cwid = req.user.id;
            const date = new Date(reserveDate);

            if (date < new Date()) {
                return res.status(403).json({ error: 'Failed to create reservation', message: "Cannot make a reservation before the current time!" });
            }

            const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:00`;
            console.log("Date string:", dateString);

            const query = 'INSERT INTO SetList (Date, CWID) VALUES (?, ?)';
            await db.query(query, [dateString, cwid]);

            res.json({ message: 'Inserted successfully' });
        });
    } catch (err) {
        console.error('Failed to make reservation:', err);
        res.status(500).json({ error: 'Failed to make reservation' });
    }
};

const deleteReservation = async (req, res) => {
    console.log("Reservation cancellation");
    const { reserveDate } = req.body;

    try {
        authenticateJWT(req, res, async () => {
            const cwid = req.user.id;
            const date = new Date(reserveDate);

            if (date < new Date()) {
                return res.status(403).json({ error: 'Failed to delete reservation', message: "Cannot delete a reservation before the current time!" });
            }

            const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:00`;
            const query = 'DELETE FROM SetList WHERE (Date = ? AND CWID = ?)';

            await db.query(query, [dateString, cwid]);
            res.json({ message: 'Deleted successfully' });
        });
    } catch (err) {
        console.error('Failed to delete reservation:', err);
        res.status(500).json({ error: 'Failed to delete reservation' });
    }
};

const setlistHandler = (req, res) => {
    if (req.method === 'GET') {
        return getSetList(req, res);
    } else if (req.method === 'POST') {
        return registerReservation(req, res);
    } else if (req.method === 'DELETE') {
        return deleteReservation(req, res);
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export { getSetList, registerReservation, deleteReservation };
export default setlistHandler;
