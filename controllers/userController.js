const {
    registerHandler,
    loginHandler, 
    logoutHandler,
    currentUser,
    avatarChangeHandler} = require("../models/auth")

const ctrlRegister = async (req, res) => {
    const user = await registerHandler(req.body);
    res.status(201).json({ user: { email: user.email, subscription: user.subscription } });
}

const ctrlLogin = async (req, res) => {
    const token = await loginHandler(req.body);
    res.json({ status: 'suces', token: token });
}

const ctrlLogout = async (req, res) => {
    await logoutHandler(req.userId);
    res.status(204).json({ status: 'succes' });
}

const ctrlCurrentUser = async (req, res) => {
    const user = await currentUser(req.userId);
    res.json({ user: { email: user.email, subscription: user.subscription } });
}

const ctrlAvatarChange = async (req, res) => {
    const { originalname } = req.file;
    const avatarPath = await avatarChangeHandler(originalname, req.userId);
    res.json({ avatarPath: avatarPath });
}

module.exports = {
    ctrlRegister,
    ctrlLogin,
    ctrlLogout,
    ctrlCurrentUser,
    ctrlAvatarChange,
}