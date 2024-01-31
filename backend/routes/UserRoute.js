const express = require('express');
const router = express.Router();
const { login, signup,getuser } = require('../controllers/Auth');

router.post('/login', login);
router.post('/signup', signup);
router.get('/getuser/:email', getuser);

module.exports = router;
