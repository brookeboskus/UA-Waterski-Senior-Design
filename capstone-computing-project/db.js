// //very important file. this is talking to amazon aws database

// require('dotenv').config();
// const mysql = require('mysql2');

// // creating the connection to amazon aws
// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT
// });

// // connecting to the database
// db.connect((err) => {
//     if (err) {
//         console.error('Database connection failed: ' + err.stack);
//         return;
//     }
//     console.log('Connected to the Amazon RDS MySQL database.');
// });

// module.exports = db;




// import dotenv from 'dotenv';
// import mysql from 'mysql2';

// dotenv.config(); // Load environment variables

// // creating the connection to Amazon AWS
// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT
// });

// // connecting to the database
// db.connect((err) => {
//     if (err) {
//         console.error('Database connection failed: ' + err.stack);
//         return;
//     }
//     console.log('Connected to the Amazon RDS MySQL database.');
// });

// // export the database connection
// export default db;



// this one uses createPool which doesn't leave persistent connections open like createConnection does
import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config(); 

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 250, 
    queueLimit: 0,
});

export default pool.promise();
