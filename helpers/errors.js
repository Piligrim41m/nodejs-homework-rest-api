class PhoneBookError extends Error {
    constructor(message) {
        super(message)
        this.status = 400
    }
}

class ValidationError extends PhoneBookError {
    constructor(message) {
        super(message)
        this.status = 400
    }
} 

class UenxistedContactError extends PhoneBookError {
    constructor(message) {
        super(message)
        this.status = 404
    }
}

class UnauthorizedError extends PhoneBookError {
    constructor(message) {
        super(message)
        this.status = 401
    }
}

class ConflictError extends PhoneBookError {
    constructor(message) {
        super(message)
        this.status = 409
    }
}

module.exports = {
    PhoneBookError,
    ValidationError,
    UenxistedContactError,
    UnauthorizedError,
    ConflictError,
}