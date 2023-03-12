const {
    listContacts,
    getContactById, 
    addContact,
    removeContact,
    updateContact,
    updateFavoriteStatus} = require("../models/contacts")

const ctrlListContacts = async (req, res) => {
    const contacts = await listContacts();
    res.json({contacts})
}

const ctrlGetContactById = async (req, res) => {
    const contact = await getContactById(req.params.contactId);
    res.json({contact})
}

const ctrlAddContact = async (req, res) => {
    await addContact(req.body);
    res.json({message: "success"})
}

const ctrlRemoveContact = async (req, res) => {
    await removeContact(req.params.contactId);
    res.json({message: "success"})
}

const ctrlUpdateContact = async (req, res) => {
    await updateContact(req.params.contactId, req.body);
    const contact = await getContactById(req.params.contactId);
    res.json({contact})
}

const ctrlUpdateFavoriteStatus = async (req, res) => {
    await updateFavoriteStatus(req.params.contactId, req.body);
    const contact = await getContactById(req.params.contactId);
    res.json({contact})
}

module.exports = {
    ctrlListContacts,
    ctrlGetContactById,
    ctrlAddContact,
    ctrlRemoveContact,
    ctrlUpdateContact,
    ctrlUpdateFavoriteStatus,
}