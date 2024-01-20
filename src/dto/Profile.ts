export interface ProfileInterface {
    user: number,
    full_name?: string,
    bio?: string,
    followers?: number[],
}

export const DEFAULT_PROFILE: ProfileInterface = {
    user: 0,
    full_name: "", 
    bio: "",
    followers: [],
}

export enum EProfileDetailMode {
    CREATE = "Create",
    EDIT = "Edit",
    DETAIL = "Detail",
}