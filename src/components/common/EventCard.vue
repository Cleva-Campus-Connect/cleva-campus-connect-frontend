<script setup>
import { RouterLink } from 'vue-router'
import { ArrowUpRight, Clock, MapPin } from '@lucide/vue'
defineProps({ event: { type: Object, required: true }, featured: { type: Boolean, default: false } })
const dayOf = (date) => new Date(date).toLocaleDateString('en-US', { day: '2-digit' })
const monthOf = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short' })
</script>
<template><article class="evt-card" :class="{ 'evt-card--featured': featured }" data-aos="fade-up">
  <RouterLink class="evt-card__media" :to="`/events/${event.slug}`">
    <img :src="event.image" :alt="`${event.title} community event`" />
    <span class="evt-card__date"><strong>{{ dayOf(event.date) }}</strong><small>{{ monthOf(event.date) }}</small></span>
    <span class="evt-card__type">{{ event.type }}</span>
  </RouterLink>
  <div class="evt-card__body">
    <p class="evt-card__campus"><MapPin :size="13" />{{ event.campus }}</p>
    <h3><RouterLink :to="`/events/${event.slug}`">{{ event.title }}</RouterLink></h3>
    <p class="evt-card__meta"><span><Clock :size="14" />{{ event.time }}</span><span><MapPin :size="14" />{{ event.venue }}</span></p>
    <p class="evt-card__excerpt">{{ event.description }}</p>
    <div class="evt-card__foot">
      <RouterLink class="evt-card__link" :to="`/events/${event.slug}`">View details <ArrowUpRight :size="16" /></RouterLink>
    </div>
  </div>
</article></template>
