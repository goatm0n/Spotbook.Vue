import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { DEFAULT_ACCOUNT, type AccountDTO, type ProfileInterface, type SpotInterface } from '@/dto';
import { apimanager } from '@/api';

export const useServiceStore = defineStore('service', () => {
  const AccountDTO: Ref<AccountDTO> = ref(DEFAULT_ACCOUNT);
  const latLng = ref();

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

  async function createSpot(spot: any) {
    return await apimanager.createSpot(spot);
  }

  async function login(payload: any) {
    const res = await apimanager.getToken(payload);
    if (res.status == 200) {
      sessionStorage.setItem('access', res.data.access);
      sessionStorage.setItem('refresh', res.data.refresh)
    }
  }

  return { 
    AccountDTO, 
    latLng,
    setAccountDTOById, 
    setAccount, 
    getAccounts,
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
    login,
  }
})
