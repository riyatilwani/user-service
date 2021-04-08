import { HttpStatusCode } from "../enums/http-status-code";
import { BaseError } from "./base-error";

export class APIError extends BaseError {
    constructor(name: string, httpCode = HttpStatusCode.INTERNAL_SERVER, description = 'Internal Server Error', isOperational = true) {
        super(name, httpCode, description, isOperational);
    }
}