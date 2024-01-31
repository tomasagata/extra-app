export default class BadResponseError extends Error {
  reasons: string[];
  errorCode = "BAD_RESPONSE";

  constructor(reasons?: string[]){
    super("BAD_RESPONSE");
    this.reasons = reasons?? [];
  }
}
  