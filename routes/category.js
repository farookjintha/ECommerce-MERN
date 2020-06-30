const express = require('express');
const { create, categoryById, read } = require('../controller/category');
const { requireSignIn, isAuth, isAdmin } = require('../controller/auth');
const { userById } = require('../controller/user');


const router = express.Router();

router.get('/category/:categoryId', read);
router.post('/category/create/:userId', requireSignIn, isAuth, isAdmin, create);

router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;