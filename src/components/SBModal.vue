<template>
    <div v-if="isOpen" class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    <slot name="header"></slot>
                </div>
                <div class="modal-body">
                    <slot name="content"></slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer"></slot>
                </div>
                <div class="modal-buttons">
                    <slot name="buttons"></slot>
                </div>
                <div class="modal-close-button">
                    <slot name="closebutton">
                        <button class="btn btn-sm btn-secondary" @click="emit('modal-close')">Close</button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    isOpen?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
    isOpen: false,
});
const emit = defineEmits(['modal-close']);
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-container {
  width: 300px;
  margin: 150px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
</style>