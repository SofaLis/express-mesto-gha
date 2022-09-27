const jwt = require('jsonwebtoken');
const Unauthorized = require('../err/Unauthorized');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new Unauthorized('Необходима авторизация'));
  }
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(err);
  }
  req.user = payload;
  next();
};
