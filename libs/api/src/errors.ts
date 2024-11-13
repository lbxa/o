import { GraphQLError } from "graphql";

export class NotFoundError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: "NOT_FOUND",
      },
    });
  }
}

export class UnauthorizedError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: "UNAUTHORIZED",
      },
    });
  }
}

export class InvalidIdError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: "INVALID_ID",
      },
    });
  }
}

export class ForbiddenError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: "FORBIDDEN",
      },
    });
  }
}

/**
 * BUILT-IN HTTP EXCEPTIONS
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
