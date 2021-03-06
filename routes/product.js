const express = require('express');
const { create, productById, read, remove, update, list, listRelated, listSearch, listCategories, listBySearch, photo } = require('../controller/product');
const { requireSignIn, isAuth, isAdmin } = require('../controller/auth');
const { userById } = require('../controller/user');


const router = express.Router();


router.get('/product/:productId', read);
router.post('/product/create/:userId', requireSignIn, isAuth, isAdmin, create);
router.delete('/product/:productId/:userId', requireSignIn, isAuth, isAdmin, remove);
router.put('/product/:productId/:userId', requireSignIn, isAuth, isAdmin, update);
router.get('/products', list);
router.get('/products/search', listSearch);
router.get('/products/related/:productId', listRelated);
router.get('/products/categories', listCategories);
router.post('/products/by/search', listBySearch);
router.get('/product/photo/:productId', photo);

router.param('userId', userById);
router.param('productId', productById);


module.exports = router;