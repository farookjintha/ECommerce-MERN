const express = require('express');
const { create } = require('../controller/product');
const { requireSignIn, isAuth, isAdmin } = require('../controller/auth');
const { userById } = require('../controller/user');


const router = express.Router();

router.post('/product/create/:userId', requireSignIn, isAuth, isAdmin, create);

router.param('userId', userById);

module.exports = router;