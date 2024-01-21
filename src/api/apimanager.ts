import { ACCOUNTS_API_URL, PROFILES_API_URL, SPOTBOOK_API_URL, SPOTS_API_URL } from "./APIRouteManager";
import APIClient from "./APIClient"
import type { AccountUpdateInterface, IAccountCreate } from "@/dto/Account";
import { type ProfileInterface } from "@/dto/Profile";

function getAxiosConfig() {
    const authToken: string = String('Bearer ').concat(sessionStorage.getItem('access') as string)
    const axiosConfig = {
        headers: {
            'Authorization': authToken,
        },
    }
    return axiosConfig
}

async function getAccountDetail(id: number) {
    const route = ACCOUNTS_API_URL + "/detail/" + id;
    return await APIClient.apiGet(route);
}

async function createAccount(account: IAccountCreate) {
    const route = ACCOUNTS_API_URL + "/create/";
    return await APIClient.apiPost(route, account);
}

async function updateAccount(account: AccountUpdateInterface) {
    const route = ACCOUNTS_API_URL + "/update/" + account.id;
    return await APIClient.apiPut(route, account);
}

async function getAccounts() {
    const route = ACCOUNTS_API_URL + "/list/";
    return await APIClient.apiGet(route);
}

async function getProfiles() {
    const route = PROFILES_API_URL + "/list/";
    return await APIClient.apiGet(route);
}

async function getProfile(userId: number) {
    const route = PROFILES_API_URL + "/user-id-detail/" + userId.toString();
    return await APIClient.apiGet(route);
}

async function updateProfile(profile: ProfileInterface) {
    const route = PROFILES_API_URL + "/update/" + profile.user.toString();
    return await APIClient.apiPut(route, profile);
}

async function getProfileFollowers(userId:number) {
    const route = PROFILES_API_URL + "/follower-profiles/" + userId.toString();
    return await APIClient.apiGet(route);
}

async function getSpot(spotId: number) {
    const route = SPOTS_API_URL + "/detail/" + spotId.toString();
    return await APIClient.apiGet(route);
}

async function getSpotFollowers(spotId: number) {
    const route = SPOTS_API_URL + "/followers/" + spotId.toString();
    return await APIClient.apiGet(route);
}

async function getSpots() {
    const route = SPOTS_API_URL + "/list/"
    return await APIClient.apiGet(route);
}

async function getUsername(userId:number) {
    const route = ACCOUNTS_API_URL + '/username/' + userId;
    return await APIClient.apiGet(route);
}

async function createSpot(spot: any) {
    const route = SPOTS_API_URL + '/create/';
    const axiosConfig = getAxiosConfig();
    return await APIClient.apiPost(route, spot, axiosConfig);
}

async function getToken(payload: any) {
    const route = SPOTBOOK_API_URL + '/users/token/';
    return await APIClient.apiPost(route, payload);
}

export default {
    getAccountDetail,
    createAccount,
    updateAccount,
    getAccounts,
    getProfiles,
    getProfile,
    updateProfile,
    getProfileFollowers,
    getSpot,
    getSpotFollowers,
    getSpots,
    getUsername,
    createSpot,
    getToken,
}