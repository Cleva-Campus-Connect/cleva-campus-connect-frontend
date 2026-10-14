<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, MapPin, Search } from '@lucide/vue'
import { events } from '../../services/mockData'
import EventCard from '../../components/common/EventCard.vue'
import closeImage from '../../assets/Images/ambassador2.jpeg'

const query = ref(''); const type = ref('All events')
const types = ['All events', ...new Set(events.map((event) => event.type))]
const filtered = computed(() => events.filter((event) => `${event.title} ${event.campus}`.toLowerCase().includes(query.value.toLowerCase()) && (type.value === 'All events' || event.type === type.value)))
const calendar = computed(() => [...events].sort((a, b) => new Date(a.date) - new Date(b.date)))
const nextEvent = computed(() => calendar.value[0])
const dayOf = (date) => new Date(date).toLocaleDateString('en-US', { day: '2-digit' })
const monthOf = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short' })

const startsAt = (event) => {
  if (!event) return new Date()
  const time = event.time?.match(/(\d+):(\d+)\s*(AM|PM)/i)
  const [year, month, day] = event.date.split('-').map(Number)
  if (!time) return new Date(year, month - 1, day)
  let hours = Number(time[1]) % 12
  if (/pm/i.test(time[3])) hours += 12
  return new Date(year, month - 1, day, hours, Number(time[2]))
}
const now = ref(Date.now()); let timer
onMounted(() => { timer = window.setInterval(() => { now.value = Date.now() }, 1000) })
onUnmounted(() => window.clearInterval(timer))
const countdown = computed(() => {
  const diff = Math.max(0, startsAt(nextEvent.value).getTime() - now.value)
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    started: diff === 0,
  }
})
</script>
<template>
  <div class="evx-hero"><div class="container evx-hero__grid">
    <div class="evx-hero__copy" data-aos="fade-right">
      <h1>Find your next <em>room.</em></h1>
      <p>Workshops, launches, and honest conversations for students building a bigger future. Find the room that fits your campus — then bring someone with you.</p>
      <div class="evx-hero__actions">
        <a class="app-button app-button--accent" href="#calendar">Browse the calendar <ArrowRight :size="16" /></a>
      </div>
    </div>
    <div class="evx-hero__visual" data-aos="fade-left">
      <article class="evx-ticket">
        <div class="evx-ticket__media">
          <img :src="nextEvent.image" :alt="`${nextEvent.title} community event`" />
          <span class="evx-ticket__flag">Next up</span>
          <span class="evx-ticket__date"><strong>{{ dayOf(nextEvent.date) }}</strong><span>{{ monthOf(nextEvent.date) }}</span></span>
        </div>
        <div class="evx-ticket__body">
          <span class="badge badge--gold">{{ nextEvent.type }}</span>
          <h3>{{ nextEvent.title }}</h3>
          <p class="event-meta"><MapPin :size="14" />{{ nextEvent.venue }} · {{ nextEvent.time }}</p>
          <div class="evx-countdown" role="timer" aria-label="Countdown to next event">
            <span><strong>{{ countdown.days }}</strong><small>days</small></span>
            <span><strong>{{ String(countdown.hours).padStart(2, '0') }}</strong><small>hrs</small></span>
            <span><strong>{{ String(countdown.minutes).padStart(2, '0') }}</strong><small>min</small></span>
            <span><strong>{{ String(countdown.seconds).padStart(2, '0') }}</strong><small>sec</small></span>
          </div>
          <RouterLink class="app-button app-button--accent" :to="`/events/${nextEvent.slug}`">View event <ArrowRight :size="16" /></RouterLink>
        </div>
        <span class="evx-ticket__notch evx-ticket__notch--left"></span>
        <span class="evx-ticket__notch evx-ticket__notch--right"></span>
      </article>
      <span class="evx-hero__badge">Save your<br /><b>seat</b></span>
    </div>
  </div></div>

  <section id="calendar" class="section evx-directory"><div class="container">
    <div class="events-heading" data-aos="fade-up">
      <div class="section-heading"><p class="eyebrow">Explore the calendar</p><h2>Find your next room.</h2><p class="section-heading__description">Search by event or campus, or filter by the kind of room you want to be in.</p></div>
      <div class="events-count"><strong>{{ filtered.length }}</strong><span>Events<br />listed</span></div>
    </div>
    <div class="events-filter-bar" data-aos="fade-up">
      <div class="events-filter-bar__top">
        <label class="search-field"><Search :size="18" /><input v-model="query" placeholder="Search events or campuses" /></label>
        <span class="events-result">{{ filtered.length }} {{ filtered.length === 1 ? 'event' : 'events' }}</span>
      </div>
      <div class="events-chips" role="group" aria-label="Filter by event type">
        <button v-for="item in types" :key="item" type="button" class="events-chip" :class="{ 'events-chip--active': type === item }" @click="type = item">{{ item }}</button>
      </div>
    </div>
    <div v-if="filtered.length" class="evx-grid"><EventCard v-for="event in filtered" :key="event.id" :event="event" /></div>
    <div v-else class="empty-state"><h3>No events match that search</h3><p>Try another title, campus, or event type.</p></div>
  </div></section>

  <section class="section section--ink events-close"><div class="container split-callout"><div data-aos="fade-right"><p class="eyebrow eyebrow--light">Never miss a moment</p><h2>Bring Cleva <em>to your campus.</em></h2><p>Campus leads run the meetups, workshops, and conversations that make this network feel local. Tell us where you study and we will help you get the next one on the calendar.</p><RouterLink class="app-button app-button--accent" to="/campus-leads">Meet the campus leads <ArrowRight :size="17" /></RouterLink></div><div class="events-close__card" data-aos="fade-left"><img :src="closeImage" alt="Cleva campus lead welcoming students at an event" /><span class="events-close__card__tag">Your campus<br /><b>could be next</b></span></div></div></section>
</template>
