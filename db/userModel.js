const { Schema, model, } = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ['starter', 'pro', 'bussiness'],
        default: 'starter',
    },
    token: String,
    avatarUrl: String,
});

userSchema.pre('save', async function () {
    if (this.isNew) {
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
});

const User = model('user', userSchema)

module.exports = User;