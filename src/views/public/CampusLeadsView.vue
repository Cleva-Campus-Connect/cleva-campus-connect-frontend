<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, ArrowUpRight, MapPin, Search } from '@lucide/vue'
import { leads } from '../../services/mockData'

const query = ref(''); const campus = ref('All campuses')
const campusFilters = ['All campuses', ...new Set(leads.map((lead) => lead.campus))]
const filtered = computed(() => leads.filter((lead) => `${lead.name} ${lead.campus}`.toLowerCase().includes(query.value.toLowerCase()) && (campus.value === 'All campuses' || lead.campus === campus.value)))
</script>
<template>
  <div class="lc-hero"><div class="container lc-hero__grid">
    <div class="lc-hero__copy" data-aos="fade-right">
      <p class="eyebrow eyebrow--light">The people behind the network</p>
      <h1>Meet your <em>campus leads.</em></h1>
      <p>Student leaders making Cleva more useful, welcoming, and close to home. Find the person running your campus — or the one to call when you are ready to run it yourself.</p>
      <div class="lc-hero__actions">
        <RouterLink class="app-button app-button--accent" to="/campuses">Find your campus <ArrowRight :size="16" /></RouterLink>
        <RouterLink class="lc-hero__link" to="/events">See upcoming events <ArrowRight :size="16" /></RouterLink>
      </div>
    </div>
    <div class="lc-collage" data-aos="fade-left">
      <img class="lc-collage__img lc-collage__img--main" :src="leads[0].image" :alt="`${leads[0].name} with students at ${leads[0].campus}`" />
      <img class="lc-collage__img lc-collage__img--second" :src="leads[2].image" :alt="`${leads[2].name} welcoming students at ${leads[2].campus}`" />
      <span class="lc-collage__tag">Your campus<br /><b>could be next</b></span>
    </div>
  </div></div>

  <section class="section lc-directory"><div class="container">
    <div class="events-heading" data-aos="fade-up">
      <div class="section-heading"><p class="eyebrow">Explore the directory</p><h2>Find your lead.</h2><p class="section-heading__description">Search by name or filter by campus to meet the student leaders keeping each community moving.</p></div>
      <div class="events-count"><strong>{{ filtered.length }}</strong><span>Leads<br />listed</span></div>
    </div>
    <div class="events-filter-bar" data-aos="fade-up">
      <div class="events-filter-bar__top">
        <label class="search-field"><Search :size="18" /><input v-model="query" placeholder="Search by name or campus" /></label>
        <span class="events-result">{{ filtered.length }} {{ filtered.length === 1 ? 'lead' : 'leads' }}</span>
      </div>
      <div class="events-chips" role="group" aria-label="Filter by campus">
        <button v-for="item in campusFilters" :key="item" type="button" class="events-chip" :class="{ 'events-chip--active': campus === item }" @click="campus = item">{{ item }}</button>
      </div>
    </div>
    <div v-if="filtered.length" class="lc-grid">
      <article v-for="lead in filtered" :key="lead.id" class="lc-card" data-aos="fade-up">
        <RouterLink class="lc-card__media" :to="`/people/${lead.id}`">
          <img :src="lead.image" :alt="`${lead.name}, ${lead.role} at ${lead.campus}`" />
          <span class="lc-card__role" :class="{ 'lc-card__role--lead': lead.role === 'Campus Lead' }">{{ lead.role }}</span>
        </RouterLink>
        <div class="lc-card__body">
          <p class="lc-card__campus"><MapPin :size="13" />{{ lead.campus }}</p>
          <h3><RouterLink :to="`/people/${lead.id}`">{{ lead.name }}</RouterLink></h3>
          <p class="lc-card__headline">{{ lead.headline }}</p>
          <div class="lc-card__foot">
            <RouterLink class="lc-card__button" :to="`/people/${lead.id}`">View profile <ArrowUpRight :size="15" /></RouterLink>
          </div>
        </div>
      </article>
    </div>
    <div v-else class="empty-state"><h3>No leads match that search</h3><p>Try another name or campus, or clear the filter.</p></div>
  </div></section>

  <section class="section section--ink events-close"><div class="container split-callout">
    <div data-aos="fade-right">
      <p class="eyebrow eyebrow--light">Run your own chapter</p>
      <h2>Your campus is <em>waiting for a lead.</em></h2>
      <p>Every community in this network started with one student who decided to go first. Register, tell us where you study, and we will help you put the first event on the calendar.</p>
      <RouterLink class="app-button app-button--accent" to="/register">Apply to lead <ArrowRight :size="17" /></RouterLink>
    </div>
    <div class="events-close__card" data-aos="fade-left"><img :src="leads[1].image" :alt="`${leads[1].name} with the ${leads[1].campus} community`" /><span class="events-close__card__tag">Lead your<br /><b>campus</b></span></div>
  </div></section>
</template>
