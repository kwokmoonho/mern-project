const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const uri = process.env.ATLAS_URI;
require('dotenv').config();
const helpsRouter = require('./routes/helps');
const usersRouter = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/helps', helpsRouter);
app.use('/users', usersRouter);

mongoose.connect(uri || 'mongodb://localhost/labhelper', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
