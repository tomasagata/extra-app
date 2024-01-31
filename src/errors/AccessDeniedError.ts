export default class AccessDeniedError extends Error {
  reasons: string[];
  errorCode = "ACCESS_DENIED";

  constructor(reasons: string[]){
    super("Permission is required to access this resource");
    this.reasons = reasons;
  }
}
