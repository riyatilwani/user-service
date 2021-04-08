import { HttpStatusCode } from "../enums/http-status-code";
import { BaseError } from "./base-error";

export class HTTP400Error extends BaseError {
    constructor(description = 'Bad Request') {
      super('NOT FOUND', HttpStatusCode.BAD_REQUEST, description, true);
    }
   }