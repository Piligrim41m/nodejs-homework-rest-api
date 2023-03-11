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

const router = express.Router()

router.get('/', asyncWrapper(ctrlListContacts));

router.get('/:contactId', asyncWrapper(ctrlGetContactById));

router.post('/', requestValidation, asyncWrapper(ctrlAddContact));

router.delete('/:contactId', asyncWrapper(ctrlRemoveContact));

router.put('/:contactId', requestValidation, asyncWrapper(ctrlUpdateContact));

router.patch('/:contactId/favorite', asyncWrapper(ctrlUpdateFavoriteStatus));

module.exports = router
