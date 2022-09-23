const jwt = require('jsonwebtoken');
const Unauthorized = require('../err/Unauthorized');

const handleAuthError = () => {
  throw new Unauthorized('Неверно введен пароль или почта');
};

const extractBearerToken = (header) => {
  header.replace('Bearer ', '');
};

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return handleAuthError(res);
  }
  req.user = payload;

  next();
};
