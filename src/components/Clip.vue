<template>
    <div style="margin: auto; text-align: center;">
        <div class="container">
            <div class="row">
                <div class="col">
                    ProfilePictire
                </div>
                <div class="col">
                    Username
                </div>
            </div>
            <div class="row">
                <div class="col">
                    ClipMedia
                </div>
            </div>
            <div class="row">
                <div class="col">
                    ClipText
                </div>
            </div>
            <div class="row">
                <div class="col">
                    LikeButton
                </div>
                <div class="col">
                    Likes
                </div>
                <div class="col">
                    ShareButton
                </div>
            </div>
            <div class="row">
                <div class="col">
                    Comments
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css"
import { type ClipInterface } from "@/dto";

interface Props {
    clip: ClipInterface,
}
const props = defineProps<Props>();
</script>