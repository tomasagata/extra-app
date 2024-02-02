export default class BadCredentials extends Error {
  reasons: string[];
  errorCode = "BAD_CREDENTIALS";

  constructor(reasons: string[]){
    super("Invalid credentials.");
    this.reasons = reasons;
  }
}