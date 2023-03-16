const express = require('express');
const { asyncWrapper } = require('../../helpers/apiHelpers');
const { requestValidation } = require('../../middleware/validation');
const {
  ctrlListContacts,
  ctrlGetContactById, 
  ctrlAddContact,
  ctrlRemoveContact,
  ctrlUpdateContact,
  ctrlUpdateFavoriteStatus} = require('../../controllers/contactsControler');
const tokenCheckout = require('../../middleware/tokenCheckout');

const router = express.Router()

router.get('/', tokenCheckout, asyncWrapper(ctrlListContacts));

router.get('/:contactId', tokenCheckout, asyncWrapper(ctrlGetContactById));

router.post('/', requestValidation, tokenCheckout, asyncWrapper(ctrlAddContact));

router.delete('/:contactId', tokenCheckout, asyncWrapper(ctrlRemoveContact));

router.put('/:contactId', tokenCheckout, requestValidation, asyncWrapper(ctrlUpdateContact));

router.patch('/:contactId/favorite', tokenCheckout, asyncWrapper(ctrlUpdateFavoriteStatus));

module.exports = router
