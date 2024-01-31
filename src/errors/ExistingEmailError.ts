export default class ExistingEmailError extends Error {
    reasons: string[];
    errorCode = "EMAIL_CONFLICT";
  
    constructor(reasons: string[]){
      super("Email is already in use. Please use another or recover your password.");
      this.reasons = reasons;
    }
}
  