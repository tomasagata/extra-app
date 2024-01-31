export default class InternalServerError extends Error {
  reasons: string[];
  errorCode = "INTERNAL_SERVER_ERROR";

  constructor(reasons: string[]){
    super("An error ocurred on our part. Please try again later.");
    this.reasons = reasons;
  }
}
  