import {
    Catch,
    Logger,
    HttpStatus,
    ArgumentsHost,
    HttpException,
    ExceptionFilter,
    UnauthorizedException,
  } from '@nestjs/common';
  
  import ConflictError from '../errors/conflict.error';
  import ResourceNotFound from '../errors/resources-not-found.error';
  import RepositoryError from '../errors/repository.error';
  import FilterNotFound from '../errors/filter-not-found.error';
import ResourceExistsError from '../errors/resource-exists.error';
import UnauthorizedCredentialsError from '../errors/unauthorized-credentials.error';
  
  @Catch()
  export class HttpErrorException implements ExceptionFilter {
    errors;
    constructor() {
      this.errors = [
        {
            instance: ResourceNotFound,
            statusCode: HttpStatus.NOT_FOUND,
        },
        {
            instance: FilterNotFound,
            statusCode: HttpStatus.NOT_FOUND,
        },
        {
            instance: ConflictError,
            statusCode: HttpStatus.CONFLICT,
        },
        {
            instance: RepositoryError,
            statusCode: HttpStatus.CONFLICT,
        },
        {
            instance: ResourceExistsError,
            statusCode: HttpStatus.CONFLICT,
        },
        {
            instance: UnauthorizedCredentialsError,
            statusCode: HttpStatus.UNAUTHORIZED
        }
      ];
    }
  
    handleError(currentError: Error) {
      const error = this.errors.find(
        (error) => currentError instanceof error.instance,
      );
      if (!error) {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Ups algo salio mal',
        };
      }
      return { status: error.statusCode, message: currentError.message };
    }
  
    catch(error: Error | HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
  
      let statusCode;
      let message;
  
      Logger.error(error.message);
      if (error instanceof HttpException) {
        message = error['response']['message'];
        statusCode = HttpStatus.BAD_REQUEST;
      } else {
        const errorInfo = this.handleError(error);
        statusCode = errorInfo.status;
        message = errorInfo.message;
      }
  
      const errorResponse = {
        timestamp: new Date().toLocaleTimeString(),
        message,
      };
  
      response.status(statusCode).json(errorResponse);
    }
  }