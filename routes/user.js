const router = require('express').Router();

const {
  getUsers, getUserId, createUser, updateAvatar, updateUser,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/:userId', getUserId);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
