const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequest = require('../err/BadRequest');
const Unauthorized = require('../err/Unauthorized');
const NotFound = require('../err/NotFound');
const Conflict = require('../err/Conflict');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      next(err);
    });
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFound({ message: 'Пользователь не найден' });
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create(
      {
        name, about, avatar, email, password: hash,
      },
    ))
    .then((user) => res.status(201).send({
      _id: user._id,
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные'));
        return;
      }
      if (err.name === 'MongoServerError') {
        next(new Conflict('Пользователь с таким email уже существует'));
        return;
      }
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      } else {
        throw new NotFound('Пользователь не найден');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequest('Некорректные данные'));
      }
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFound('Пользователь не найден');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequest('Некорректные данные'));
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch(() => {
      next(new Unauthorized('Неверно введен пароль или почта'));
    });
};

module.exports.getUsersMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      }
      consol.log(req.user._id)
      res.send({ data: user });
    })
    .catch(next);
};
