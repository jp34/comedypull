
export class ConfigurationError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, ConfigurationError.prototype);
    }
}

export class InvalidInputError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, InvalidInputError.prototype);
    }
}

export class InvalidOperationError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, InvalidOperationError.prototype);
    }
}

export class NonExistentResourceError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, NonExistentResourceError.prototype);
    }
}

export class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}

export class ServerError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, ServerError.prototype);
    }
}
