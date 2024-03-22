<template>
    <div v-if="mode === 'Create'" style="margin: auto; align-items: center;">
        <SBDetail :data="createSpotListData" :errors="errors"/>
        <button class="btn btn-sm btn-secondary m-1 mb-0" @click.prevent="handleAddSpotList">Add</button>
        <button class="btn btn-sm btn-secondary mt-1 mb-0" @click.prevent="emit('cancel')">Cancel</button>
    </div>
</template>

<script setup lang="ts">
import { SBDetail } from '@/components';
import { useForm } from 'vee-validate';
import { ref, toRef } from 'vue';
import { object, string } from 'yup';
import regex from '@/regex';
import { useServiceStore } from '@/stores';

const serviceStore = useServiceStore()
type Mode = 'Create' | 'Edit' | 'Detail' | 'Hidden'
interface Props {
    mode?: Mode,
}
const props = withDefaults(defineProps<Props>(), {
    mode: 'Detail',
})
const mode = toRef(props.mode);
const emit = defineEmits(['cancel'])

const validationSchema = object({
    name: string()
        .required("${label} is required")
        .max(32)
        .matches(regex.simpleText, '${label} must be alphanumeric and spaces only')
        .label('name'),
});
const { validate, errors, defineField } = useForm({validationSchema});
const [name] = defineField('name');
const createSpotListData = ref({
    name: name,
}) 

async function handleAddSpotList() {
    if (name.value != undefined) {
        name.value = name.value.trim();
    }
    const validation = await validate();
    const isValid = validation.valid;
    if (isValid) {
        const res = await serviceStore.createSpotList(name.value);
        console.log(res)
        if (res?.status===201) {
            serviceStore.spotLists.push(res.data);
            mode.value = 'Hidden';
        }
    }
}
</script>