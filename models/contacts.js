const Contact = require('../db/contactModel');
const { UenxistedContactError } = require('../helpers/errors');

const listContacts = async (user, page, limit = 20) => {

  const contacts = await Contact
    .find({ owner: user })
    .select({ __v: 0 })
    .skip(((page - 1) * limit))
    .limit(limit);
  return contacts;
}

const getContactById = async (contactId, user) => {
  try {
    const contact = await Contact.findOne({
      _id: contactId,
      owner: user,
    }).select({ __v: 0 });
    if (!contact) {
      throw new UenxistedContactError(`Failure! There is no contact found with id: ${contactId}`)
    }
    return contact
  } catch (error) {
    throw new UenxistedContactError(`Failure! There is no contact found with id: ${contactId}`)
  };
}

const addContact = async ({name, email, phone, favorite = false}, user) => { 
  const contact = new Contact({
    name,
    email,
    phone,
    favorite,
    owner: user,
  })
  await contact.save();
  return contact;
}

const removeContact = async (contactId, user) => {
  try {
    await Contact.findByIdAndRemove({ _id: contactId, owner: user });
  } catch (error) {
    throw new UenxistedContactError(`Failure! There is no contact found with id: ${contactId}`)
  };
}

const updateContact = async (contactId, { name, email, phone, favorite = false }, user) => {
  try {
    await Contact.findByIdAndUpdate(
      { _id: contactId, owner: user },
      { $set: { name, email, phone, favorite } },);
  } catch (error) {
    throw new UenxistedContactError(`Failure! There is no contact found with id: ${contactId}`)
  };
}
  
const updateFavoriteStatus = async (contactId, { favorite }, user) => {
  try {
    await Contact.findByIdAndUpdate(
      { _id: contactId, owner: user },
      { $set: { favorite } },);
  } catch (error) {
    throw new UenxistedContactError(`Failure! There is no contact found with id: ${contactId}`)
  };
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavoriteStatus,
}
