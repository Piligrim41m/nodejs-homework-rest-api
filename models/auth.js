const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../db/userModel');
const { ConflictError, UnauthorizedError } = require('../helpers/errors');

const registerHandler = async ({ email, password, subscription = 'starter', }) => {
    const user = new User({
        email,
        password,
        subscription,
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
    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthorizedError(`User with email ${email} has been  not found`);
    }
    const comparation = await bcrypt.compare(password, user.password);
    if (!comparation) {
        throw new UnauthorizedError('Wrong password');
    }
    const token = await jwt.sign(user._id.toString(), process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRES} );
    await User.findByIdAndUpdate(user._id.toString(), { $set: { token } });
    return token;
}

const logoutHandler = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new UnauthorizedError('This user is not autorized');
    }
    await User.findByIdAndUpdate(userId, { $set: { token: '' } });
}

const currentUser = async (userId) => {
    console.log(userId);
    const user = await User.findById(userId);
    if (!user) {
        throw new UnauthorizedError('This user is not autorized');
    }
    return user;
}

module.exports = {
    registerHandler,
    loginHandler,
    logoutHandler,
    currentUser,
}