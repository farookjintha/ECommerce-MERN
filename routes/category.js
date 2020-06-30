const express = require('express');
const { create, categoryById, read, update, remove, list } = require('../controller/category');
const { requireSignIn, isAuth, isAdmin } = require('../controller/auth');
const { userById } = require('../controller/user');


const router = express.Router();

router.get('/category/:categoryId', read);
router.post('/category/create/:userId', requireSignIn, isAuth, isAdmin, create);
router.put('/category/:categoryId/:userId', requireSignIn, isAuth, isAdmin, update);
router.delete('/category/:categoryId/:userId', requireSignIn, isAuth, isAdmin, remove);
router.get('/categories', list);

router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;