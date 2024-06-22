import { computed, inject, provide } from "vue";
import { useRouter, type RouteRecordName } from "vue-router";


export function useProvideNavigationItems() {
    useProvideNavBarRouteNames();

    return {
        useNavBarRouteNames,
    }
}

export function useProvideNavBarRouteNames(): RouteRecordName[] {
    const router = useRouter();
    const navBarItems = computed<RouteRecordName[]>(() => {
        let navRoutes: RouteRecordName[] = []
        router.getRoutes().forEach((x) => {
            if (x.meta?.showInNavBar && x.name) {
                navRoutes.push(x.name);
            }
        });
        return navRoutes;
    });
    provide<RouteRecordName[]>('navBarRouteNames', navBarItems.value)
    return navBarItems.value
}

export function useNavBarRouteNames(): RouteRecordName[] {
    const navBarRouteNames = inject<RouteRecordName[]>('navBarRouteNames');
    if (navBarRouteNames === undefined) {
        throw new Error("navBarRouteNames is not provided !!!");
    } else {
        return navBarRouteNames
    }
}