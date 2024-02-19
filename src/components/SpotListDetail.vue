<template>
    <div v-if="props.mode === 'Create'" style="margin: auto; align-items: center;">
        <SBDetail :data="createSpotListData" />
        <button class="btn btn-sm btn-secondary m-1 mb-0" @click="handleAddSpotList">Add</button>
        <button class="btn btn-sm btn-secondary mt-1 mb-0" @click="emit('cancel')">Cancel</button>
    </div>
</template>

<script setup lang="ts">
import { SBDetail } from '@/components';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { object, string } from 'yup';

type Mode = 'Create' | 'Edit' | 'Detail'
interface Props {
    mode?: Mode,
}
const props = withDefaults(defineProps<Props>(), {
    mode: 'Detail',
})
const emit = defineEmits(['cancel'])

const validationSchema = object({
    name: string().max(32).required("${label} is required").label('name'),
});
const { validate, errors, defineField } = useForm({validationSchema});
const [name] = defineField('name');
const createSpotListData = ref({
    name: name,
}) 

function handleAddSpotList() {
    
}
</script>