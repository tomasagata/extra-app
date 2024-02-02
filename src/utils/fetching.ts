import Config from "react-native-config";
import NetworkError from "../errors/NetworkError";
import BadResponseError from "../errors/BadResponseError";
import InternalServerError from "../errors/InternalServerError";
import DataValidationError from "../errors/DataValidationError";
import SessionExpiredError from "../errors/SessionExpiredError";
import AccessDeniedError from "../errors/AccessDeniedError";
import BadCredentials from "../errors/BadCredentialsError";


export async function getFromApi(resource: string, config: RequestInit = {}) {
  try {
    var response = await fetch( Config.API_URL + resource, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      },
      credentials: 'include',
      ...config
    });
  } catch (error) {
    return Promise.reject(new NetworkError());
  }
  
  try {
    var body = await response.json();
  } catch (error) {
    return Promise.reject(new BadResponseError());
  }
  
  if(response.ok){
    return body;
  }

  if(response.status >= 500){
    return Promise.reject(new InternalServerError((body as ApiError).errors));
  }

  if(response.status == 400){
    return Promise.reject(new DataValidationError((body as ApiError).errors));
  }

  if(response.status == 401){
    return Promise.reject(new SessionExpiredError((body as ApiError).errors));
  }

  if(response.status == 403){
    return Promise.reject(new AccessDeniedError((body as ApiError).errors));
  }

  if(response.status >= 400){
    return Promise.reject(new Error(body?.message));
  }
}

export async function postToApi(resource: string, config: RequestInit = {}) {
  try {
    var response = await fetch( Config.API_URL + resource, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      credentials: 'include',
      ...config
    });
  } catch (error) {
    return Promise.reject(new NetworkError());
  }
  
  if(response.headers.get("content-length") == "0"){
    return null;
  }

  try {
    var body = await response.json();
  } catch (error) {
    return Promise.reject(new BadResponseError());
  }
  
  if(response.ok){
    return body;
  }

  if(response.status >= 500){
    return Promise.reject(new InternalServerError((body as ApiError).errors));
  }

  if(response.status == 400){
    return Promise.reject(new DataValidationError((body as ApiError).errors));
  }

  if(response.status == 401){
    return Promise.reject(new SessionExpiredError((body as ApiError).errors));
  }

  if(response.status == 403){
    return Promise.reject(new AccessDeniedError((body as ApiError).errors));
  }

  if(response.status >= 400){
    return Promise.reject(new Error(body?.message));
  }

}

export async function deleteFromApi(resource: string, config: RequestInit = {}) {
  try {
    var response = await fetch( Config.API_URL + resource, {
      method: 'DELETE' ,
      headers: {
        Accept: 'application/json'
      },
      credentials: 'include',
      ...config
    });
  } catch (error) {
    return Promise.reject(new NetworkError());
  }

  try {
    var body = await response.json();
  } catch (error) {
    return Promise.reject(new BadResponseError());
  }
  
  if(response.ok){
    return body;
  }

  if(response.status >= 500){
    return Promise.reject(new InternalServerError((body as ApiError).errors));
  }

  if(response.status == 400){
    return Promise.reject(new DataValidationError((body as ApiError).errors));
  }

  if(response.status == 401){
    return Promise.reject(new SessionExpiredError((body as ApiError).errors));
  }

  if(response.status == 403){
    return Promise.reject(new AccessDeniedError((body as ApiError).errors));
  }

  if(response.status >= 400){
    return Promise.reject(new Error(body?.message));
  }
}

export async function postToApiButWithInvalidCredentialsCheck(resource: string, config: RequestInit = {}) {
  try {
    var response = await fetch( Config.API_URL + resource, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      credentials: 'include',
      ...config
    });
  } catch (error) {
    return Promise.reject(new NetworkError());
  }
  
  if(response.headers.get("content-length") == "0"){
    return null;
  }

  try {
    var body = await response.json();
  } catch (error) {
    return Promise.reject(new BadResponseError());
  }
  
  if(response.ok){
    return body;
  }

  if(response.status >= 500){
    return Promise.reject(new InternalServerError((body as ApiError).errors));
  }

  if(response.status == 400){
    return Promise.reject(new DataValidationError((body as ApiError).errors));
  }

  if(response.status == 401){
    return Promise.reject(new BadCredentials((body as ApiError).errors));
  }

  if(response.status == 403){
    return Promise.reject(new AccessDeniedError((body as ApiError).errors));
  }

  if(response.status >= 400){
    return Promise.reject(new Error(body?.message));
  }

}
