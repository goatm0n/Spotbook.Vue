<template>
    <div style="margin: auto; text-align: center;">
        <div v-if="loading"><h2>LOADING</h2></div>
        <div v-if="mode==='Detail'">
            <SBDetail v-if="!loading" :data="detailData"/>
            <br>
            <LikeButton class="m-1" :spotId="spot.id" :liked="doesUserLike"/>
            <FollowButton :spot-id="spot.id" /><br>
            <FollowersButton class="btn btn-sm btn-secondary m-1" mode="Spot" :count="spot.properties.followers.length" :spotId="spot.id"/>
            <LikesButton class="btn btn-sm btn-secondary" mode="Spot" :count="spot.properties.likes.length" :spotId="spot.id" /><br>
            <CoordsButton :coords="spot.geometry.coordinates"/>
            <RouterLink :to="{name: 'Upload Clip', params: {spotId: spot.id}}" class="btn btn-sm btn-secondary m-1">
                Upload Clip
            </RouterLink><br>
            <button class="btn btn-sm btn-secondary" @click="userId ? isModalOpen=true : toast.error('Login')">Save</button>
        </div>
        <div v-else-if="mode==='Create' || mode==='Edit'" >
            <SBDetail :data="spotForm" :errors="errors" />
            <label>spotType</label>
            <br>
            <select v-model="spotTypeChoice">
                <option value="Street">Street</option>
                <option value="Skatepark">Skatepark</option>
                <option value="D.I.Y">D.I.Y</option>
            </select>
            <br>
            <br>
            <button type="button" :class="buttonClass" @click="handleUpdateSpot">
                {{ buttonText }}
            </button>
        </div>
    </div>
    <SBModal :isOpen="isModalOpen" @modal-close="isModalOpen=false">
        <template #header>Save Spotlist Item</template>
        <template #content>
            <SaveSpotListItem v-if="userId" :user-id="userId" :spot-id="spot.id"/>
        </template>
        <template #footer>
            <SpotListDetail v-if="addNewSpotList" mode="Create" @cancel="addNewSpotList=false"/>
        </template>
        <template #buttons>
            <button v-if="!addNewSpotList" @click="addNewSpotList=true" class="btn btn-sm btn-secondary m-1">Add New Spotlist</button>
        </template>
    </SBModal>
</template>

<script setup lang="ts">
import { 
    SBDetail, 
    FollowersButton, 
    LikesButton, 
    LikeButton, 
    CoordsButton, 
    FollowButton, 
    SBModal, 
    SpotListDetail,
    SaveSpotListItem,
} from '@/components';
import { ref, toRef, type Ref, type ComputedRef, computed } from 'vue';
import { DEFAULT_SPOT, type SpotGeometry, type SpotInterface, type SpotProperties, type SpotType } from '@/dto';
import { useServiceStore } from '@/stores';
import { object, string } from 'yup';
import { useForm } from 'vee-validate';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const router = useRouter();
const route = useRoute();
const serviceStore = useServiceStore();

type Mode = 'Create' | 'Edit' | 'Detail';

interface Props {
    spotId?: number | string,
    spot?: SpotInterface,
    mode?: Mode,
    lat?: number,
    lng?: number,
}

const props = withDefaults(defineProps<Props>(), {
    mode: 'Detail',
});
const mode: Ref<Mode> = toRef(props.mode);
const spotId: Ref<number> = ref(0); 
const spot: Ref<SpotInterface> = ref(DEFAULT_SPOT);
const userId: Ref<number|undefined> = ref();

interface SpotForm {
    title: string,
    description: string,
}
const spotForm: Ref<SpotForm> = ref({
    title: "",
    description: "",
});
const validationSchema = object({
    title: string().required().max(250),
    description: string().required(),
});
const { defineField, validate, errors } = useForm({validationSchema});
const [titleField] = defineField('title');
const [descriptionField] = defineField('description');

const spotTypeChoice: Ref<SpotType> = ref('Street');
const loading: Ref<boolean> = ref(false);
const isModalOpen: Ref<boolean> = ref(false);
const addNewSpotList: Ref<boolean> = ref(false);

const buttonText: ComputedRef<string> = computed(() => {
    return mode.value === 'Create' ? 'Create Spot' : 'Update Spot';
});
const buttonClass: ComputedRef<string> = computed(() => {
    return mode.value === 'Create' ? 'btn btn-success' : 'btn btn-primary';
});
const detailData: ComputedRef<any> = computed(() => {
    return props.spot ? {
        title: props.spot.properties.title,
        description: props.spot.properties.description,
        spotType: props.spot.properties.spotType,
    } : {}
});
const doesUserLike: ComputedRef<boolean|undefined> = computed(() => {
    const ssUserId: string|null = sessionStorage.getItem('userId');
    if (ssUserId) {
        return spot.value.properties.likes.includes(Number(ssUserId));
    }
    
});

async function init() {
    loading.value = true;
    if (props.lat && props.lng) {
        serviceStore.latLng = [props.lat, props.lng];
    }
    if (props.mode === 'Create' && !serviceStore.latLng && (!props.lat || !props.lng)) {
        router.push('/spotmap');
    }
    if (props.spotId) {
        try {spotId.value = Number(props.spotId)} catch (err) {console.log(err)}
    }
    if (props.spot) {
        spot.value = props.spot;
    } else if (spotId.value > 0) {
        spot.value = await serviceStore.getSpot(spotId.value); 
    }
    userId.value = await serviceStore.getUserId();
    loading.value = false;
}

async function handleUpdateSpot() {
    if (spotForm.value.title != undefined && spotForm.value.title !== "") {
        spotForm.value.title = spotForm.value.title.trim();
    }
    if (spotForm.value.description != undefined && spotForm.value.description !== "") {
        spotForm.value.description = spotForm.value.description.trim();
    }
    titleField.value = spotForm.value.title;
    descriptionField.value = spotForm.value.description;
    const validation = await validate();
    loading.value = true;
    if (validation.valid && serviceStore.latLng) {
        switch (mode.value) {
            case 'Create':
                await createSpot();
                break;
            case 'Edit': 
                await updateSpot()
            default: 
                break
        }
    }
    loading.value = false;
}

async function updateSpot() {
    throw new Error("Not Implemented");
}

async function createSpot() {
    const newSpot = {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: serviceStore.latLng,
        },
        properties: {
            title: titleField.value,
            description: descriptionField.value,
            spotType: spotTypeChoice.value,
        },
    }
    try {
        const res = await serviceStore.createSpot(newSpot);    
        if (res.status == 201) {
            toast.success('Success!')
        }
    } catch (err) {
        console.log(err);
        toast.error("Failed To Create Spot");
    }
}

init();
</script>