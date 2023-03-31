const express = require('express');
const { asyncWrapper } = require('../../helpers/apiHelpers');
const tokenCheckout = require('../../middleware/tokenCheckout');
const { authValidation, emailResendValidation } = require('../../middleware/validation');
const {
    ctrlRegister,
    ctrlLogin, 
    ctrlLogout,
    ctrlCurrentUser,
    ctrlAvatarChange,
    ctrlResendEmail,
    ctrlVerificationMailChecker} = require('../../controllers/userController');
const upload = require('../../middleware/upload');

const router = express.Router();

router.post('/register', authValidation, asyncWrapper(ctrlRegister));

router.post('/login', authValidation, asyncWrapper(ctrlLogin));

router.post('/logout', tokenCheckout, asyncWrapper(ctrlLogout));

router.post('/users/verify', emailResendValidation, asyncWrapper(ctrlResendEmail));

router.get('/current', tokenCheckout, asyncWrapper(ctrlCurrentUser));

router.get('/verify/:verificationToken', asyncWrapper(ctrlVerificationMailChecker));

router.patch('/avatars', tokenCheckout, upload.single('avatar'), asyncWrapper(ctrlAvatarChange));

module.exports = router