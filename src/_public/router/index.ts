import type { RouteRecordRaw } from "vue-router";
import { HomeView } from "../views";
import { AccountDetail, ProfileDetail } from "@/components";
import { Accounts, Followers, Profiles, Spot, Spots } from "@/views";

export const PUBLIC_ROUTES: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
        meta: { navbar: true}
      },
      {
        name: "Create Account",
        path: "/account/create",
        component: AccountDetail,
        props: { mode: "Create" }
      },
      {
        name: "Account - Edit",
        path: "/account/edit/:id",
        component: AccountDetail,
        props: { mode: "Edit" },
      },
      {
        name: "Account - Detail",
        path: "/account/detail/:id",
        component: AccountDetail,
        props: true,
      },
      {
        name: "Accounts",
        path: "/accounts",
        component: Accounts,
        meta: { navbar: true }
      },
      {
        name: "Profiles",
        path: "/profiles",
        component: Profiles,
      },
      {
        name: "Profile",
        path: "/profile/:userId",
        component: ProfileDetail,
        props: true,
      },
      {
        name: "Edit Profile",
        path: "/profile/edit/:userId",
        component: ProfileDetail,
        props: { mode: "Edit" },
      },
      {
        name: "Profile Followers",
        path: "/profile/followers/:userId",
        component: Followers,
        props: true,
      },
      {
        name: "Spot",
        path: "/spot/:spotId",
        component: Spot,
        props: true,
      },
      {
        name: "Spot Followers",
        path: "/spot/followers/:spotId",
        component: Followers,
        props: true,
      },
      {
        name: "Spots",
        path: "/spots",
        component: Spots,
      }
]