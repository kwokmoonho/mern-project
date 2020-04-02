const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path")
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;
const app = express();

require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());
//API | routes
const helpsRouter = require('./routes/helps');
const usersRouter = require('./routes/users');
app.use('/helps', helpsRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, '../public')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public'))
})

mongoose.connect(uri || 'mongodb://localhost/labhelper', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
