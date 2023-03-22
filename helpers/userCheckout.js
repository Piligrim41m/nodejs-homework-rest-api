const User = require("../db/userModel");
const { UnauthorizedError } = require("./errors");

const userCheckoutById = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new UnauthorizedError('No user autorized');
    }
    return user
}

const userChekoutByEmail = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthorizedError(`User with email ${email} has been not found`);
    }
    return user
}

module.exports = {
    userCheckoutById,
    userChekoutByEmail,
}