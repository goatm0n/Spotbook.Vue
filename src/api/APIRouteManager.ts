

export const BASE_URL: string= window.location.protocol + "//" + window.location.host;

const baseApiUrl: string = import.meta.env.PROD ? "https://spotbookserver.spotbookapp.com" : 'http://localhost:8000';

export const ACCOUNTS_API_URL: string = baseApiUrl + "/accounts/api";
export const PROFILES_API_URL: string = baseApiUrl + "/profiles/api";
export const SPOTS_API_URL: string = baseApiUrl + "/spots/api";
export const SPOTBOOK_API_URL: string = baseApiUrl + '/api';
export const CLIPS_API_URL: string = baseApiUrl + '/clips/api';
