const router = require('express').Router();

const {
  getUsers, getUserId, updateAvatar, updateUser, getUsersMe,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUserId);
router.get('/users/me', getUsersMe);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
