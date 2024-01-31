
export class BadRequestError extends Error {
    constructor(message) {
        super(message);
    }
}

export class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
    }
}

export class NotFoundError extends Error {
    constructor(message) {
        super(message);
    }
}

export class TooManyRequestsError extends Error {
    constructor(message) {
        super(message);
    }
}