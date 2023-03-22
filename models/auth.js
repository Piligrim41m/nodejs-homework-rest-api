const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../db/userModel');
const { ConflictError, UnauthorizedError } = require('../helpers/errors');
const { userChekoutByEmail, userCheckoutById } = require('../helpers/userCheckout');
const gravatar = require('gravatar');
const path = require('path')
const Jimp = require('jimp');
const fs = require('fs').promises;

const registerHandler = async ({ email, password, subscription = 'starter', }) => {
    const avatarUrl = await gravatar.url(email)
    const user = new User({
        email,
        password,
        subscription,
        avatarUrl,
    });
    try {
        await user.save();
    } catch (err) {
        if (err.code === 11000) {
            throw new ConflictError(`Email ${email} is already in use`);
        }
    }
    return user;
}

const loginHandler = async ({ email, password }) => {
    const user = await userChekoutByEmail(email);
    const comparation = await bcrypt.compare(password, user.password);
    if (!comparation) {
        throw new UnauthorizedError('Wrong password');
    }
    const token = await jwt.sign(user._id.toString(), process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRES} );
    await User.findByIdAndUpdate(user._id.toString(), { $set: { token } });
    return token;
}

const logoutHandler = async (userId) => {
    await userCheckoutById(userId)
    await User.findByIdAndUpdate(userId, { $set: { token: '' } });
}

const currentUser = async (userId) => {
    const user = await userCheckoutById(userId);
    return user;
}

const avatarChangeHandler = async (originalname, userId) => {
    const uploadPath = path.resolve(`./tmp/${originalname}`);
    const avatarName = userId + '-' + originalname;
    const user = await userCheckoutById(userId);
    await User.findByIdAndUpdate(user._id.toString(), {
        $set: { avatarUrl: `./public/avatars/${avatarName}` },
    });
    Jimp.read(uploadPath, (err, picture) => {
        if (err) {
            console.log(err.message);
        }
        picture
            .resize(250, 250)
            .write(path.resolve(`./public/avatars/${avatarName}`));
    });
    fs.unlink(uploadPath);
    return `/api/avatars/${avatarName}`
}

module.exports = {
    registerHandler,
    loginHandler,
    logoutHandler,
    currentUser,
    avatarChangeHandler,
}