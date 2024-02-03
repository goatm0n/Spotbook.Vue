import type { RouteRecordRaw } from "vue-router";
import { HomeView } from "../views";
import { AccountDetail, ProfileDetail, SpotMap, SpotDetail, LoginForm, } from "@/components";
import { Accounts, Followers, Profiles, Spot, Spots, CreateSpot, ClipView, SpotLikes, ClipLikes, Profile, UploadClip, Users } from "@/views";

export const PUBLIC_ROUTES: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: SpotMap,
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
        component: Profile,
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
      },
      {
        name: 'Spot Map',
        path: '/spotmap',
        component: SpotMap,
      },
      {
        name: 'Create Spot',
        path: '/createspot/:lat/:lng',
        component: CreateSpot,
        props: true,
      },
      {
        name: 'Clip',
        path: '/clip/:clipId',
        component: ClipView,
        props: true,
      },
      {
        name: 'Spot Likes',
        path: '/spotlikes/:spotId',
        component: SpotLikes,
        props: true,
      },
      {
        name: 'Clip Likes',
        path: '/cliplikes/:clipId',
        component: ClipLikes,
        props: true,
      },
      {
        name: 'Login',
        path: '/login',
        component: LoginForm,
      },
      {
        name: 'Users',
        path: '/users',
        component: Users,
      },
      {
        name: 'Upload Clip',
        path:'/uploadclip/:spotId',
        component: UploadClip,
        props: true,
      },
]