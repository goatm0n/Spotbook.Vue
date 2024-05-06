import { apimanager } from "@/api";
import type { SpotMapIcon } from "@/dto/Spot";

async function fetchSpotMapIconList(): Promise<SpotMapIcon[]> {
    const res = await apimanager.getSpotMapIconList();
    return res.data;
}   

async function getSpotMapIconList(fetch?:boolean): Promise<SpotMapIcon[]> {
    const icons: string | null = sessionStorage.getItem('spotMapIcons');
    if (fetch || !icons) {
        return await fetchSpotMapIconList();
    } else {
        return JSON.parse(icons);
    }
}

async function getIcons() {
    let spotMapIcons: SpotMapIcon[] = await getSpotMapIconList();

    return { spotMapIcons }
}

async function loadStaticData() {
    let { spotMapIcons } = await getIcons();
    sessionStorage.setItem("spotMapIcons", JSON.stringify(spotMapIcons)); 
}

export async function startup() {
    await loadStaticData();
}