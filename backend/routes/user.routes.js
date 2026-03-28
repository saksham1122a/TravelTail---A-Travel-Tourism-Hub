const express = require('express');
const router = express.Router();
const {
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser
} = require('../controllers/user.controller');
const { protect, admin } = require('../middleware/auth.middleware');

router.route('/')
  .post(protect, admin, createUser)
  .get(protect, admin, getUsers);

router.route('/profile')
  .put(protect, updateUserProfile);

router.route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

module.exports = router;
