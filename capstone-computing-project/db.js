// //very important file. this is talking to amazon aws database

// this uses createPool which doesn't leave persistent connections open like createConnection does
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
    connectTimeout: 20000,
});

export default pool.promise();
