const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const app = express();

const options = {
    host: process.env.DB_HOST,    
    port: process.env.DB_PORT,           
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME, 
};


const sessionStore = new MySQLStore(options);

app.use(
    session({
        secret: 'your-secret-key',
        store: sessionStore,
        resave: false,
        saveUninitialized: true
    })
);

app.get('/', (req, res) => {

    let username = req.session.username;

    console.log(username);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});