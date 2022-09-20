const router = require('express').Router();
const {
  getUsers, getUserId, updateAvatar, updateUser, getUsersMe,
} = require('../controllers/users');
const { celebrate, Joi } = require('celebrate');
const regular = /(https?:\/\/)([www.]?[a-zA-Z0-9-]+\.)([^\s]{2,})/;

router.get('/users', getUsers);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUserId);

router.get('/users/me', getUsersMe);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regular),
  }),
}), updateAvatar);

module.exports = router;
