export default class MapperError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;
  constructor(message: string, mapperName: string, method: string) {
    this.name = 'MAPPER_ERROR';
    this.message = `Error in mapper [${message}] especifically [${mapperName}], Detail: [${method}]`;
  }
}
