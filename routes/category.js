const express = require('express');
const { create } = require('../controller/category');
const { requireSignIn, isAuth, isAdmin } = require('../controller/auth');
const { userById } = require('../controller/user');


const router = express.Router();

router.post('/category/create/:userId', requireSignIn, isAuth, isAdmin, create);

router.param('userId', userById);

module.exports = router;