const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path")

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const helpsRouter = require('./routes/helps');
const usersRouter = require('./routes/users');
app.use('/helps', helpsRouter);
app.use('/users', usersRouter);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri || 'mongodb://localhost/labhelper', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static( 'client/build' ));

  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); // relative path
  });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
