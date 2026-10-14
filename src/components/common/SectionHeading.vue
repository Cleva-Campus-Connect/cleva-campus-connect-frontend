<script setup>
defineProps({ eyebrow: String, title: { type: String, required: true }, description: String })
</script>

<template>
  <div class="section-heading">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h2>{{ title }}</h2>
    <p v-if="description" class="section-heading__description">{{ description }}</p>
  </div>
</template>
