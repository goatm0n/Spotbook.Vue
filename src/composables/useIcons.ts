import type { SpotMapIcon } from "@/dto/Spot";
import { Icon } from "leaflet";
import { inject, provide, ref, type Ref } from "vue";


export function useProvideSpotMapIcons() {
    const icons = getSpotMapIcons();
    const spotMapIcons: Ref<SpotMapIcon[]> = ref<SpotMapIcon[]>(icons);

    provide<Ref<SpotMapIcon[]>>('spotMapIcons', spotMapIcons);

    function getLeafletIconOrDefault(name?:string): Icon {
        const spotMapIcon = getSpotMapIconOrDefault(spotMapIcons.value, name);
        return new Icon ({iconUrl: spotMapIcon.iconUrl, iconSize: [25,41]});
    }

    return { spotMapIcons, getLeafletIconOrDefault }
}

export function useSpotMapIcons() {
    const spotMapIcons = inject<Ref<SpotMapIcon[]>>('spotMapIcons'); 

    function getLeafletIconOrDefault(name?:string): Icon {
        const spotMapIcon = getSpotMapIconOrDefault(spotMapIcons?.value, name);
        return new Icon ({iconUrl: spotMapIcon.iconUrl, iconSize: [25,41]});
    }

    return { spotMapIcons, getLeafletIconOrDefault } 
}


export function getSpotMapIcon(name:string, spotMapIcons?:SpotMapIcon[]): SpotMapIcon {
    if (!spotMapIcons || !spotMapIcons.length) {
        throw new Error('No SpotMapIcons Provided');
    }
    const spotMapIcon = spotMapIcons.filter(x => x.name===name)[0];
    if (!spotMapIcon) {
        if (name==='default') {
            // missing default entry in DB 
            // or something has gone wrong between the api get and here
            // should be in sessionstorage as SpotMapIconList 
            throw new Error('No default SpotMapIcon')
        } else {
            throw new Error(`No ${name} SpotMapIcon`)
        }
    }
    return spotMapIcon
}

export function getSpotMapIconOrDefault(spotMapIcons?:SpotMapIcon[], name?:string): SpotMapIcon {
    try {
        return getSpotMapIcon(name || 'default', spotMapIcons);
    } catch (error) {
        if (error instanceof Error) {
            if (error.message!=='No SpotMapIcons Provided') {
                return getSpotMapIcon('default', spotMapIcons);
            }
        }
        throw error;
    }
}


function getSpotMapIcons(): SpotMapIcon[] {
    const res: string | null = sessionStorage.getItem('spotMapIcons');
    if (res !== null) {
        return JSON.parse(res);
    } else {
        throw new Error('No spotMapIcons in sessionStorage');
    }
}