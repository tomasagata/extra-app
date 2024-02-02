export default class SessionExpiredError extends Error {
  reasons: string[];
  errorCode = "SESSION_EXPIRED";

  constructor(reasons: string[]){
    super("Session has expired. Please log in again to continue.");
    this.reasons = reasons;
  }
}
