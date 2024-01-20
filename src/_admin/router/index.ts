import type { RouteRecordRaw } from "vue-router";
import { AdminHome } from "../views";
import { Accounts, Profiles } from "@/views";

export const ADMIN_ROUTES: RouteRecordRaw[] = [
    {
        name: "Admin",
        path: "/admin",
        component: AdminHome,
    },
    {
      name: "AccountsManager",
      path: "/admin/accounts",
      component: Accounts,
      props: { editMode: true }  
    },
    {
        name: "ProfilesManager",
        path: "/admin/profiles",
        component: Profiles,
        props: { admin: true }
    },
]

export const ADMIN_NAVBAR_ROUTES_NAMES: string[] = [
    'Admin',
    'Home',
    'AccountsManager',
    'ProfilesManager',
]
