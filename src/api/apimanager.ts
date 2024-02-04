import { ACCOUNTS_API_URL, CLIPS_API_URL, PROFILES_API_URL, SPOTBOOK_API_URL, SPOTS_API_URL } from "./APIRouteManager";
import APIClient from "./APIClient"
import type { AccountUpdateInterface, IAccountCreate } from "@/dto/Account";
import { DEFAULT_PROFILE, type ProfileInterface } from "@/dto/Profile";
import type { ClipForm } from "@/dto";
import axios from "axios";

function getAxiosConfig() {
    const authToken: string = String('Bearer ').concat(sessionStorage.getItem('access') as string)
    const axiosConfig = {
        headers: {
            'Authorization': authToken,
        },
    }
    return axiosConfig
}
function getFileUploadAxiosConfig() {
    const authToken: string = String('Bearer ').concat(sessionStorage.getItem('access') as string)
    const axiosConfig = {
        headers: {
            'Authorization': authToken,
            'Content-Type': 'multipart/form-data',
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
    const axiosConfig = getFileUploadAxiosConfig();
    return await APIClient.apiPut(route, profile, axiosConfig);
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

async function getClip(clipId: number) {
    const route = CLIPS_API_URL + `/detail/${clipId}`;
    return await APIClient.apiGet(route);
}

async function getSpotClips(spotId: number) {
    const route = CLIPS_API_URL + `/list-spot/${spotId}/`;
    return await APIClient.apiGet(route);
}

async function getUserClips(userId:number) {
    const route = CLIPS_API_URL + `/list-user-id/${userId}`;
    return await APIClient.apiGet(route);
}

async function getProfilesByIds(idArray: number[]): Promise<ProfileInterface[]> {
    throw new Error("Not Implemented");
}

async function getSpotLikes(spotId: number) {
    const route = SPOTS_API_URL + `/likes/${spotId}/`;
    return await APIClient.apiGet(route);
}

async function getClipLikes(clipId: number) {
    const route = CLIPS_API_URL + `/likes/${clipId}`;
    return await APIClient.apiGet(route);
}

async function getProfileClipFeed(userId:number) {
    const route = CLIPS_API_URL + `/profile-clipfeed/${userId}/`;
    return await APIClient.apiGet(route);
}

async function getSpotClipFeed(spotId: number) {
    const route = CLIPS_API_URL + `/spot-clipfeed/${spotId}`;
    return await APIClient.apiGet(route);
}

async function uploadClip(data: ClipForm) {
    const route = CLIPS_API_URL + '/create/';
    const axiosConfig = getFileUploadAxiosConfig();
    return await APIClient.apiPost(route, data, axiosConfig);
}

async function getToken(payload: any) {
    const route = SPOTBOOK_API_URL + '/users/token/';
    return await APIClient.apiPost(route, payload);
}

async function getUserIdFromEmail(email: string) {
    const route = PROFILES_API_URL + '/get-user-id-from-email/' + email;
    return await APIClient.apiGet(route);
}

async function clipLikeToggle(clipId:number) {
    const route = `${CLIPS_API_URL}/like-toggle/${clipId}/`    
    const axiosConfig = getAxiosConfig();
    return await APIClient.apiPost(route, {}, axiosConfig)    
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
    getClip,
    getSpotClips,
    getUserClips,
    getProfilesByIds,
    getSpotLikes,
    getClipLikes,
    getProfileClipFeed,
    getSpotClipFeed,
    uploadClip,
    getToken,
    getUserIdFromEmail,
    clipLikeToggle,
}