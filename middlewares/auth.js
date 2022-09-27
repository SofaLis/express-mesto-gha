const jwt = require('jsonwebtoken');
const Unauthorized = require('../err/Unauthorized');

module.exports = (req, res, next) => {
  const re = /jwt=/;
  const token = req.headers.cookie.replace(re, '');
  if (!token) {
    next(new Unauthorized('Необходима авторизация'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new Unauthorized('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
