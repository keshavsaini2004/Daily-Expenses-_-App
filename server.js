const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');
const cors = require('cors');
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;


//Importing the routes
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

//Use the Router file
app.use('/user', userRoutes);
app.use('/expense',expenseRoutes);

app.listen(5000, ()=>{
  console.log('Server is running on port 5000');
})