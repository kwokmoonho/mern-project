const express = require('express');
const cors = require('cors');
var mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// const uri = process.env.ATLAS_URI;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/labhelper');
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const helpsRouter = require('./routes/helps');
const usersRouter = require('./routes/users');

app.use('/helps', helpsRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
