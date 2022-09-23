const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
// const {
// celebrate, Joi,
// } = require('celebrate');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

// const regular = /(https?:\/\/)([www.]?[a-zA-Z0-9-]+\.)([^\s]{2,})/;

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use(userRoutes);
app.use(cardRoutes);

app.use((req, res, next) => {
  res.status(404).send({ message: 'Простите, страница не найдена' });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
