// very important file. 

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/auth');
const cors = require('cors'); // Cross-Origin requests

const app = express();

app.use(cors()); 
app.use(bodyParser.json()); 

app.use('/auth', authRoutes);

const PORT = 4000; //localhost
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
