import { GraphQLError } from "graphql";

/**
 * BUILT-IN HTTP EXCEPTIONS to be used for reference
 * @see https://docs.nestjs.com/exception-filters#built-in-http-exceptions

 * BadRequestException
 * UnauthorizedException
 * NotFoundException
 * ForbiddenException
 * NotAcceptableException
 * RequestTimeoutException
 * ConflictException
 * GoneException
 * HttpVersionNotSupportedException
 * PayloadTooLargeException
 * UnsupportedMediaTypeException
 * UnprocessableEntityException
 * InternalServerErrorException
 * NotImplementedException
 * ImATeapotException
 * MethodNotAllowedException
 * BadGatewayException
 * ServiceUnavailableException
 * GatewayTimeoutException
 * PreconditionFailedException
 */

interface BaseErrorOptions {
  customerSupport?: boolean;
}

class BaseError extends GraphQLError {
  constructor(message: string, code: string, options?: BaseErrorOptions) {
    if (options?.customerSupport) {
      message = [
        message,
        "Please try again or contact support if the issue persists.",
      ].join(" ");
    }

    super(message, {
      extensions: {
        code,
      },
    });
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string, options?: BaseErrorOptions) {
    super(message, "NOT_FOUND", options);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string, options?: BaseErrorOptions) {
    super(message, "UNAUTHORIZED", options);
  }
}

export class InvalidIdError extends BaseError {
  constructor(message: string, options?: BaseErrorOptions) {
    super(message, "INVALID_ID", options);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message: string, options?: BaseErrorOptions) {
    super(message, "FORBIDDEN", options);
  }
}

export class NotImplementedError extends BaseError {
  constructor(message: string, options?: BaseErrorOptions) {
    super(message, "NOT_IMPLEMENTED", options);
  }
}

export class ServiceUnavailableError extends BaseError {
  constructor(message: string, options?: BaseErrorOptions) {
    super(message, "SERVICE_UNAVAILABLE", options);
  }
}

export class InternalServerError extends BaseError {
  constructor(message: string, options?: BaseErrorOptions) {
    super(message, "INTERNAL_SERVER_ERROR", options);
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string, options?: BaseErrorOptions) {
    super(message, "BAD_REQUEST", options);
  }
}

export class ConflictError extends BaseError {
  constructor(message: string, options?: BaseErrorOptions) {
    super(message, "CONFLICT", options);
  }
}
