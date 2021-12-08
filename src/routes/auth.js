'use strict'

const express = require('express');

const router = new express.Router();

const Auth = require('../controllers/AuthController');
const Profile = require('../controllers/ProfileController');
const authMiddleware = require('../middlewares/auth');


//middlewares - protect routes
router.use('/profile',authMiddleware);
router.use('/logout',authMiddleware);

router.post('/login',Auth.login);
router.post('/register',Auth.register);
router.get('/profile',Profile.profile);
router.post('/logout',Profile.logout);

module.exports = router;