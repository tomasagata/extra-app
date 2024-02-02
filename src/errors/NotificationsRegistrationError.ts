export default class NotificationsRegistrationError extends Error {
  errorCode = "PUSH_REGISTRATION_ERROR";

  constructor(message: string){
    super(message);
  }
}