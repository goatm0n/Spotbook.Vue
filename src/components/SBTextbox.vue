<template>
    <label v-if="labelText" :for="uniqueId">{{ labelText }}</label>
    <br v-if="labelText">
    <input :id="uniqueId" type="text" v-model="model" :readonly="readonly ? readonly : false" :disabled="disabled"> 
    <p v-if="errorText" :key="errorText" style="color: red;">{{ errorText }}</p>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
interface Props {
    uniqueId: string,
    modelValue?: string,
    labelText?: string,
    errorText?: string,
    readonly?: boolean,
    disabled?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
    readonly: false,
    disabled: false,
});
const componentRef = ref();
const emit = defineEmits(['update:modelValue']);
const model = computed({
    get() {
        return props.modelValue 
    },
    set(value) {
        emit('update:modelValue', value)
    }
    
})
</script>