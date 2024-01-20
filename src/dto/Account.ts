export interface AccountInterface {
    email: string,
    username: string,
    password: string,
    date_joined: string,
    last_login: string,
    is_admin: boolean,
    is_active: boolean,
    is_staff: boolean,
    is_superuser: boolean,
    id: number,
}

export const DEFAULT_ACCOUNT: AccountInterface = {
    email: "",
    username: "",
    password: "",
    date_joined: "",
    last_login: "",
    is_admin: false,
    is_active: false,
    is_staff: false,
    is_superuser: false,
    id: 0,
}

export type AccountDTO = AccountInterface

export interface IAccountCreate {
    email: string,
    username: string,
    password: string,
}

export type AccountCreateDTO = IAccountCreate

export interface AccountUpdateInterface {
    email: string,
    username: string,
    password: string,
    id: number,
}

export enum EAccountDetailMode {
    CREATE = "Create",
    EDIT = "Edit",
    DETAIL = "Detail",
}
  
 
