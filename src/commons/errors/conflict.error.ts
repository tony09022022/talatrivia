export default class ConflictError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;
  constructor(message: string) {
    this.name = 'CONFLICT_ERROR';
    this.message = message;
  }
}
