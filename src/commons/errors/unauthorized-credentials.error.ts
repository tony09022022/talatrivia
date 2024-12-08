export default class UnauthorizedCredentialsError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor(reason: string = 'unauthorized credentials') {
    this.name = 'UNAUTHORIZED_CREDENTIALS';
    this.message = reason;
  }
}