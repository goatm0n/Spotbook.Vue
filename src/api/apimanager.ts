import { ACCOUNTS_API_URL, PROFILES_API_URL, SPOTS_API_URL } from "./APIRouteManager";
import APIClient from "./APIClient"
import type { AccountUpdateInterface, IAccountCreate } from "@/dto/Account";
import { type ProfileInterface } from "@/dto/Profile";

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
}