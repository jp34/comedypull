"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = exports.UnauthorizedError = exports.NonExistentResourceError = exports.InvalidOperationError = exports.InvalidInputError = exports.ConfigurationError = void 0;
class ConfigurationError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, ConfigurationError.prototype);
    }
}
exports.ConfigurationError = ConfigurationError;
class InvalidInputError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, InvalidInputError.prototype);
    }
}
exports.InvalidInputError = InvalidInputError;
class InvalidOperationError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, InvalidOperationError.prototype);
    }
}
exports.InvalidOperationError = InvalidOperationError;
class NonExistentResourceError extends Error {
    constructor(resourceType, searchParams) {
        super(`Resource does not exist: ${resourceType}${searchParams}`);
        Object.setPrototypeOf(this, NonExistentResourceError.prototype);
    }
}
exports.NonExistentResourceError = NonExistentResourceError;
class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ServerError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, ServerError.prototype);
    }
}
exports.ServerError = ServerError;