const express = require('express');
const { create, productById, read } = require('../controller/product');
const { requireSignIn, isAuth, isAdmin } = require('../controller/auth');
const { userById } = require('../controller/user');


const router = express.Router();

router.get('/product/:productId', read);
router.post('/product/create/:userId', requireSignIn, isAuth, isAdmin, create);

router.param('userId', userById);
router.param('productId', productById);
module.exports = router;