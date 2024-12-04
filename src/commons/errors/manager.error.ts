export default class ManagerError implements Error {
    name: string;
    message: string;
    stack?: string | undefined;
    constructor(serviceName: string, functionName: string, method: string) {
      this.name = 'TRANSACTION_MANAGER';
      this.message = `Error in manager transaction. Service: [${serviceName}] especifically [${functionName}], Detail: [${method}]`;
    }
  }