const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.use(userRoutes);
app.use(cardRoutes);

app.use((req, next) => {
  req.user = {
    _id: '63204f62bcaee3f0148d43ca',
  };
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
