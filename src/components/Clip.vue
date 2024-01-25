<template>
    <div style="margin: 64px; text-align: center;">
        <div v-if="!loading && clip" class="clip">
            <div class="clip-header">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <img :src="clip?.profile_picture ? clip?.profile_picture : 'https://i.stack.imgur.com/l60Hf.png'" alt="profile picture" class="image"/>
                        </div>
                        <div class="col username">
                            <RouterLink 
                                v-if="clip?.user"
                                :to="{name: 'Profile', params: {userId: clip?.user}}" 
                                style="text-decoration: none; color: inherit;"
                            >
                                {{ clip?.username }}
                            </RouterLink>

                        </div>
                    </div>
                </div>
            </div>
            <div class="clip-media">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            ClipMedia
                        </div>
                    </div>        
                </div>
            </div>
            <div class="clip-textcontent">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            {{ clip?.textContent }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="clip-buttons">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            LikeButton
                        </div>
                        <div class="col">
                            <LikesButton mode="Clip" :count="clip?.likesCount" :clipId="clipId" />
                        </div>
                        <div class="col">
                            ShareButton
                        </div>
                    </div>
                </div>
            </div>
            <div class="clip-comments">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            Comments
                        </div>
                    </div>
                </div>    
            </div>
            
        </div>
    </div>    
</template>

<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css"
import { type ClipInterface } from "@/dto";
import { toRef, type Ref, type ComputedRef, computed, ref } from "vue";
import { LikesButton } from "@/components";
import { useServiceStore } from "@/stores";
import { toast } from "vue3-toastify";

const serviceStore = useServiceStore();

interface Props {
    clipId: number,
}
const props = defineProps<Props>();

const clip: Ref<ClipInterface | undefined> = ref();
const loading: Ref<boolean> = ref(false); 

async function init() {
    loading.value = true;
    await loadData();
    loading.value = false;
}

async function loadData() {
    try {
        if (props.clipId) {
            const res = await serviceStore.getClip(props.clipId);
            clip.value = res;      
        }
    } catch (err) {
        console.log(err);
        toast.error("Failed to load data");
    }
}

init();
</script>

<style>
.clip {
    width: 100%;
    height: auto;
    border: 1px solid black;
    margin: auto;
    text-align: center;
}
.clip-header {
    width: 100%;
    height: auto;
    border: 1px solid black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}
.clip-header .username {
    font-weight: bold;
}
.clip-header .image {
    padding: 0.3rem;
    width: 32px;
    height: 32px;
}
.clip-media {
    border: 1px solid black;
}
.clip-textcontent {
    border: 1px solid black;;
}
.clip-buttons {
    border: 1px solid black;
}
.clip-comments {
    border: 1px solid black;
}

</style>