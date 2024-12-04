export default class ResourceNotFound implements Error {
  name: string;
  message: string;
  stack?: string | undefined;
  constructor(resouceType: string, resouceField: string, resource: string) {
    this.name = 'RESOURCE_NOT_FOUND';
    this.message = `${resouceType} with ${resouceField} '${resource}' not exist`;
  }
}
