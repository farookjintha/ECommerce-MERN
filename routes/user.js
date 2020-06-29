const express = require('express');
const {sayHi} = require('../controller/user');

const router = express.Router();

router.get('/', sayHi);

module.exports = router;