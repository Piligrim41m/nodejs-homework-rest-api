const express = require('express');
const { asyncWrapper } = require('../../helpers/apiHelpers');
const tokenCheckout = require('../../middleware/tokenCheckout');
const { authValidation } = require('../../middleware/validation');
const {
    ctrlRegister,
    ctrlLogin, 
    ctrlLogout,
    ctrlCurrentUser,
    ctrlAvatarChange} = require('../../controllers/userController');
const upload = require('../../middleware/upload');

const router = express.Router();

router.post('/register', authValidation, asyncWrapper(ctrlRegister));

router.post('/login', authValidation, asyncWrapper(ctrlLogin));

router.post('/logout', tokenCheckout, asyncWrapper(ctrlLogout));

router.get('/current', tokenCheckout, asyncWrapper(ctrlCurrentUser));

router.patch('/avatars', tokenCheckout, upload.single('avatar'), asyncWrapper(ctrlAvatarChange));

module.exports = router