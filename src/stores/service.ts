import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { DEFAULT_ACCOUNT, type AccountDTO, type ProfileInterface, type SpotInterface, type ClipDetail, type ClipForm, type SpotListItemDTO, type SpotListDTO, type SBLoginFormDTO } from '@/dto';
import { apimanager } from '@/api';
import type { SpotListUser } from '@/dto/Spot';
import type { IAccountCreate } from '@/dto/Account';
import type { AxiosErrorHandle } from '@/api/APIClient';

export const useServiceStore = defineStore('service', () => {
  const AccountDTO: Ref<AccountDTO> = ref(DEFAULT_ACCOUNT);
  const latLng = ref();
  const spotLists: Ref<SpotListDTO[]> = ref([]);
  const currentSpotListItems: Ref<SpotListItemDTO[]> = ref([]);

  function setAccount(account: AccountDTO): void{
    AccountDTO.value = account;
  }

  async function setAccountDTOById(id: number) {
    const res = await getAccountDTOById(id);
    AccountDTO.value = res;
  }

  async function getAccountDTOById(id: number): Promise<AccountDTO> {
    const res = await apimanager.getAccountDetail(id);
    return res.data;
  }

  async function getAccounts(): Promise<AccountDTO[]> {
    const res = await apimanager.getAccounts();
    return res.data;
  }

  async function createAccount(account:IAccountCreate) {
    return await apimanager.createAccount(account);
  }

  async function getProfiles(): Promise<ProfileInterface[]> {
    const res = await apimanager.getProfiles();
    return res.data;
  }

  async function getProfile(userId: number): Promise<ProfileInterface> {
    const res = await apimanager.getProfile(userId);
    return res.data;
  }

  async function updateProfile(profile: ProfileInterface) {
    return await apimanager.updateProfile(profile);
  }

  async function getProfileFollowers(userId: number): Promise<ProfileInterface[]> {
    const res = await apimanager.getProfileFollowers(userId);
    return res.data;
  }

  async function getSpot(spotId: number): Promise<SpotInterface> {
    const res = await apimanager.getSpot(spotId);
    return res.data;
  }

  async function getSpotFollowers(spotId: number): Promise<ProfileInterface[]> {
    const res = await apimanager.getSpotFollowers(spotId);
    return res.data;
  }

  async function getSpots(): Promise<SpotInterface[]> {
    const res = await apimanager.getSpots();
    return res.data.features;
  }

  async function getSpotsByIds(spotIds: number[]): Promise<SpotInterface[]> {
    throw new Error("Not Implemented")
  }

  async function getUsername(userId:number): Promise<string> {
    const res = await apimanager.getUsername(userId);
    return res.data;
  }

  async function createSpot(spot: any, axiosErrorHandle?: AxiosErrorHandle) {
    return await apimanager.createSpot(spot, axiosErrorHandle);
  }

  async function getClip(clipId: number) {
    const res = await apimanager.getClip(clipId);
    return res.data;
  }

  async function getSpotClips(spotId: number) {
    const res = await apimanager.getSpotClips(spotId);
    return res.data;
  }

  async function getUserClips(userId:number): Promise<number[]> {
    const res = await apimanager.getUserClips(userId);
    return res.data.clip_id_list;
  }

  async function getProfilesByIds(idArray: number[]): Promise<ProfileInterface[]> {
    const res = await apimanager.getProfilesByIds(idArray);
    return res
  }

  async function getSpotLikes(spotId: number) {
    const res = await apimanager.getSpotLikes(spotId);
    return res.data;
  }

  async function getClipLikes(clipId: number) {
    const res = await apimanager.getClipLikes(clipId); 
    return res.data;
  }

  async function getProfileClipFeed(userId: number): Promise<ClipDetail[]> {
    const res = await apimanager.getProfileClipFeed(userId);
    return res.data;
  }

  async function getSpotClipFeed(spotId: number): Promise<ClipDetail[]> {
    const res = await apimanager.getSpotClipFeed(spotId);
    return res.data;
  }

  async function uploadClip(data: ClipForm, axiosErrorHandle?: AxiosErrorHandle) {
    return await apimanager.uploadClip(data, axiosErrorHandle);
  }

  async function getUserId(): Promise<number|undefined> {
    const ssUserId: string | null = sessionStorage.getItem('userId');
    const ssEmail: string | null = sessionStorage.getItem('email');
    if (ssUserId) {
      return Number(ssUserId);
    }
    if (ssEmail) {
      const res = await apimanager.getUserIdFromEmail(ssEmail);
      const userId: number = res.data.userId;
      if (userId) {
        sessionStorage.setItem('userId', userId.toString());
        return userId;
      }
    }
    return undefined
  }

  async function login(payload: SBLoginFormDTO) {
    const res = await apimanager.getToken(payload);
    if (res?.status == 200) {
      sessionStorage.setItem('access', res.data.access);
      sessionStorage.setItem('refresh', res.data.refresh);
      sessionStorage.setItem('email', payload.email);
      sessionStorage.removeItem('userId');
      await getUserId();
    }
  }

  async function clipLikeToggle(clipId:number) {
    return await apimanager.clipLikeToggle(clipId);
  }

  async function spotLikeToggle(spotId:number) {
    return await apimanager.spotLikeToggle(spotId);
  }

  function logOut() {
    sessionStorage.removeItem('refresh');
    sessionStorage.removeItem('access');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('userId');
  }

  async function spotFollowToggle(spotId:number) {
    return await apimanager.spotFollowToggle(spotId);
  }

  async function userFollowToggle(userId:number) {
    return await apimanager.userFollowToggle(userId);
  }

  async function getSpotList(userId:number, name:string) {
    switch (name) {
      case 'following':
        return await apimanager.getSpotsUserFollows(userId);
      case 'likes':
        return await apimanager.getSpotsUserLikes(userId);
      default:
        return await apimanager.getSpotsUserFollows(userId);        
    }
  }

  async function getSpotLists(userId:number) {
    return await apimanager.getSpotLists(userId);
  }

  async function getSpotListById(id:number) {
    return await apimanager.getSpotList(id);
  }

  async function createSpotListItem(spotListItem: SpotListItemDTO) {
    return await apimanager.createSpotListItem(spotListItem);
  }

  async function getSpotListItems(userId:number, spotId:number) {
    return await apimanager.getSpotListItems(userId, spotId);
  }

  async function deleteSpotListItem(spotListItemId:number) {
    return await apimanager.deleteSpotListItem(spotListItemId);
  }

  async function createSpotList(name:string) {
    return await apimanager.createSpotList(name);
  }

  async function deleteSpotList(id:number) {
    return await apimanager.deleteSpotList(id);
  }

  async function getSpotListUsers(spotlistId:number) {
    try {
      const res = await apimanager.getSpotListUsers(spotlistId);
      return res.data; 
    } catch (error) {
      throw error
    }
  }

  async function createSpotListUser(userId:number, spotListId:number): Promise<SpotListUser> {
    try {
      const res = await apimanager.createSpotListUser(userId, spotListId);
      return res?.data
    } catch (error) {
      throw error
    }
  }

  async function deleteSpotListUser(userId:number) {
    return await apimanager.deleteSpotListUser(userId);
  }

  async function getUsersLike(username:string): Promise<AccountDTO[]> {
    try {
      let res = await apimanager.getUsersLike(username);
      return res.data
    } catch (error) {
      throw error
    }
  }

  return { 
    AccountDTO, 
    latLng,
    spotLists,
    currentSpotListItems,
    setAccountDTOById, 
    setAccount, 
    getAccounts,
    createAccount,
    getProfiles, 
    getProfile ,
    updateProfile,
    getProfileFollowers,
    getSpot,
    getSpotFollowers,
    getSpots,
    getSpotsByIds,
    getUsername,
    createSpot,
    getClip,
    getSpotClips,
    getProfilesByIds,
    getSpotLikes,
    getClipLikes,
    getUserClips,
    getProfileClipFeed,
    getSpotClipFeed,
    uploadClip,
    login,
    getUserId,
    clipLikeToggle,
    spotLikeToggle,
    logOut,
    spotFollowToggle,
    userFollowToggle,
    getSpotList,
    getSpotLists,
    getSpotListById,
    createSpotListItem,
    getSpotListItems,
    deleteSpotListItem,
    createSpotList,
    deleteSpotList,
    getSpotListUsers,
    createSpotListUser,
    deleteSpotListUser,
    getUsersLike,
  }
})
