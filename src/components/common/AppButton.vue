<script setup>
defineProps({ variant: { type: String, default: 'primary' }, type: { type: String, default: 'button' }, disabled: Boolean })
</script>

<template>
  <button :type="type" :disabled="disabled" class="app-button" :class="`app-button--${variant}`"><slot /></button>
</template>
