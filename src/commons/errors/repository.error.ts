export default class RepositoryError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;
  constructor(repositoryName: string, method: string, message: string) {
    this.name = 'REPOSITORY_ERROR';
    this.message = `Error in repository ${repositoryName} especifically in ${method} method, Detail: ${message}`;
  }
}
