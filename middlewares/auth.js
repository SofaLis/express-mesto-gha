const jwt = require('jsonwebtoken');
const Unauthorized = require('../err/Unauthorized');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new Unauthorized('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch () {
    next(new Unauthorized('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
