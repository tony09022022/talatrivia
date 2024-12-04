export default class ResourceExistsError implements Error {
    name: string;
    message: string;
    stack?: string | undefined;
    constructor(resouceType: string, resouceField: string, resource: string) {
      this.name = 'RESOURCE_EXISTS_ERROR';
      this.message = `${resouceType} with ${resouceField} '${resource}' already created`;
    }
  }