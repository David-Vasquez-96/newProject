import {actionNames}  from './actionNames';
import {currency} from './currency';
import {functions} from './functions';

export const APP_NAME = process.env.REACT_APP_SECRET_NAME;
export const API_BASE_URL_DATA =process.env.REACT_APP_API_BACKEND;
export const API_BASE_URL_SECURITY =process.env.REACT_APP_API_SSO;

export const ACCESS_TOKEN = 'accessToken';
export const OAUTH2_REDIRECT_URI = 'http://localhost:4001/oauth2/redirect'

export const GOOGLE_AUTH_URL = API_BASE_URL_SECURITY + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL_SECURITY + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_BASE_URL_SECURITY + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;

export {actionNames};
export {currency}
export {functions};

export const publicMenu  =[];

// Recaptcha
// export const RECATPCHA_KEY = '6LeWIusaAAAAADKQNx1b9xereuH2BU1wBoinOQQ-';
// export const REACT_APP_API_RECATPCHA = 'https://recaptchaenterprise.googleapis.com';
// export const RECAPTCHA_PROJECT_ID = 'recaptcha-tse-310217';
// export const RECAPTCHA_API_KEY = 'AIzaSyD-oV1iAvtLHMBgsNtBbsOHssPIew1OeR8';
// export const ACTION_RECAPTCHA = "USER_CREATION_REQUEST_FORM";