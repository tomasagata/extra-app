export default class NetworkError extends Error {
  reasons: string[];
  errorCode = "NETWORK_ERROR";

  constructor(reasons?: string[]){
    super("Could not connect to API. Internet access is required to use the app.");
    this.reasons = reasons?? [];
  }
}
