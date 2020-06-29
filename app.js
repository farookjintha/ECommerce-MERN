const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config()

//Import Routes
const userRoutes = require('./routes/user');

//App
const app = express();

//Database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('Database Connected...'));

//routes middleware

app.use('/api', userRoutes);


const port  = process.env.PORT || 8000

app.listen(port, () =>{
    console.log(`The server is running on port ${port}`);
});

