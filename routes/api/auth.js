const express = require('express');
const { asyncWrapper } = require('../../helpers/apiHelpers');
const tokenCheckout = require('../../middleware/tokenCheckout');
const { authValidation } = require('../../middleware/validation');
const {
    ctrlRegister,
    ctrlLogin, 
    ctrlLogout,
    ctrlCurrentUser} = require('../../controllers/userController');

const router = express.Router();

router.post('/register', authValidation, asyncWrapper(ctrlRegister));

router.post('/login', authValidation, asyncWrapper(ctrlLogin));

router.post('/logout', tokenCheckout, asyncWrapper(ctrlLogout));

router.get('/current', tokenCheckout, asyncWrapper(ctrlCurrentUser));

module.exports = router