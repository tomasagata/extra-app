export default class DataValidationError extends Error {
  reasons: string[];
  errorCode = "VALIDATION_FAILED";

  constructor(reasons: string[]){
    super("One or more of the selected fields is incorrect. Please correct it and try again.");
    this.reasons = reasons;
  }
}
