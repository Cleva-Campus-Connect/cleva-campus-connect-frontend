<script setup>
import { RouterLink } from 'vue-router'
import { ArrowUpRight, MapPin } from '@lucide/vue'
defineProps({ campus: { type: Object, required: true } })
</script>
<template><article class="campus-card" data-aos="fade-up"><div class="campus-card__art" :style="{ background: campus.color, color: campus.color === '#111111' ? '#fff' : 'var(--color-primary-dark)' }"><img v-if="campus.image" :src="campus.image" :alt="`${campus.name} Cleva ambassador community`" /><div class="campus-card__art-overlay"></div></div><div class="campus-card__body"><p class="card-kicker"><MapPin :size="14" />{{ campus.city }}, {{ campus.state }}</p><h3>{{ campus.name }}</h3><p>{{ campus.description }}</p><RouterLink class="app-button app-button--accent campus-card__button" :to="`/campuses/${campus.slug}`">View campus <ArrowUpRight :size="16" /></RouterLink></div></article></template>
