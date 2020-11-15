import MyStorage from './storage';

const TokenKey = 'CUSTOM_TOKEN';

export function getToken () {
  return MyStorage.localStorage.getItem(TokenKey);
}

export function setToken (token) {
  return MyStorage.localStorage.setItem(TokenKey, token);
}

export function removeToken () {
  return MyStorage.localStorage.removeItem(TokenKey);
}
