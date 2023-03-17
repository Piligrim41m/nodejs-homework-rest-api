const Joi = require('joi');
const { ValidationError } = require('../helpers/errors');

const requestValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().alphanum().trim().min(3).max(30).required(),
        email: Joi.string().trim().min(3).max(30).required(),
        phone: Joi.string().trim().min(3).max(30).required(),
        favorite: Joi.bool()
    });
    const resultValidation = schema.validate(req.body);
    if (resultValidation.error) {
        next(new ValidationError(resultValidation.error));
    }
    next()
}

const authValidation = (req, res, next) => {
    const schema = Joi.object({
        password: Joi.string().alphanum().min(6).max(30).required(),
        email: Joi.string().min(6).max(30).required(),
        subscription: Joi.string(),
    });
    const resultValidation = schema.validate(req.body);
    if (resultValidation.error) {
        console.log(resultValidation.error);
        next(new ValidationError(resultValidation.error));
    }
    next()
}

module.exports = {
    requestValidation,
    authValidation,
}