export default class FilterNotFound implements Error {
  name: string;
  message: string;
  stack?: string | undefined;
  constructor() {
    this.name = 'FILTER_NOT_FOUND';
    this.message = `Filter not found`;
  }
}
