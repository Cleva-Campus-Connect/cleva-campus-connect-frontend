<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { ArrowLeft, ArrowRight, CalendarDays, Clock, GraduationCap, MapPin, Sparkles, Ticket, Users } from '@lucide/vue'
import { campuses, events } from '../../services/mockData'
import EventCard from '../../components/common/EventCard.vue'
import galleryOne from '../../assets/Images/ambassador1.webp'
import galleryTwo from '../../assets/Images/ambassador4.jpg'
import galleryThree from '../../assets/Images/ambassador3.jpeg'

const route = useRoute()
const event = computed(() => events.find((item) => item.slug === route.params.slug))
const campus = computed(() => campuses.find((item) => item.slug === event.value?.campusSlug))
const related = computed(() => events.filter((item) => item.slug !== route.params.slug).slice(0, 2))
const dayOf = (date) => new Date(date).toLocaleDateString('en-US', { day: '2-digit' })
const monthOf = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short' })
const longDate = (date) => new Date(date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
const gallery = [
  { src: galleryOne, alt: 'Cleva ambassadors welcoming students at a campus event' },
  { src: galleryTwo, alt: 'Students connecting at a Cleva campus meetup' },
  { src: galleryThree, alt: 'Cleva ambassador speaking at a student gathering' },
]

const startsAt = () => {
  if (!event.value) return new Date()
  const time = event.value.time?.match(/(\d+):(\d+)\s*(AM|PM)/i)
  const [year, month, day] = event.value.date.split('-').map(Number)
  if (!time) return new Date(year, month - 1, day)
  let hours = Number(time[1]) % 12
  if (/pm/i.test(time[3])) hours += 12
  return new Date(year, month - 1, day, hours, Number(time[2]))
}
const now = ref(Date.now()); let timer
onMounted(() => { timer = window.setInterval(() => { now.value = Date.now() }, 1000) })
onUnmounted(() => window.clearInterval(timer))
const countdown = computed(() => {
  const diff = startsAt().getTime() - now.value
  if (diff <= 0) return { label: 'Happening now', sub: 'The room is open' }
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff / 3600000) % 24)
  const minutes = Math.floor((diff / 60000) % 60)
  if (days >= 1) return { label: `${days} day${days === 1 ? '' : 's'}`, sub: `${hours}h ${minutes}m to go` }
  return { label: `${hours}h ${minutes}m`, sub: `${Math.floor((diff / 1000) % 60)}s to go` }
})
</script>
<template>
  <div v-if="event" class="event-detail">
    <section class="ed-hero">
      <div class="container">
        <RouterLink class="back-link back-link--light" to="/events"><ArrowLeft :size="16" /> All events</RouterLink>
        <div class="ed-hero__grid">
          <div class="ed-hero__copy" data-aos="fade-right">
            <div class="ed-hero__kicker">
              <span class="badge badge--gold">{{ event.type }}</span>
              <RouterLink v-if="campus" class="ed-hero__campus" :to="`/campuses/${campus.slug}`"><GraduationCap :size="15" />{{ event.campus }} <ArrowRight :size="13" /></RouterLink>
              <span v-else class="ed-hero__campus"><GraduationCap :size="15" />{{ event.campus }}</span>
            </div>
            <h1>{{ event.title }}</h1>
            <p class="ed-hero__text">{{ event.description }}</p>
            <div class="ed-hero__meta">
              <span><CalendarDays :size="17" />{{ longDate(event.date) }}</span>
              <span><Clock :size="17" />Starts at {{ event.time }}</span>
              <span><MapPin :size="17" />{{ event.venue }}</span>
            </div>
            <div class="ed-hero__actions">
              <button class="app-button app-button--accent" type="button"><Ticket :size="17" /> Registration opens soon</button>
            </div>
          </div>
          <div class="ed-hero__visual" data-aos="fade-left">
            <img class="ed-hero__image" :src="event.image" :alt="`${event.title} community event`" />
            <span class="ed-hero__date"><strong>{{ dayOf(event.date) }}</strong><span>{{ monthOf(event.date) }}</span></span>
            <span class="ed-hero__countdown"><strong>{{ countdown.label }}</strong><small>{{ countdown.sub }}</small></span>
            <span class="ed-hero__stamp">CLEVA<br /><b>EVENTS</b></span>
          </div>
        </div>
      </div>
    </section>

    <section class="section ed-body">
      <div class="container ed-body__grid">
        <div class="ed-body__main" data-aos="fade-up">
          <p class="eyebrow">About this event</p>
          <h2>Why this room exists.</h2>
          <p class="large-copy">{{ event.longDescription || event.description }}</p>

          <div class="ed-block">
            <div class="ed-block__heading"><p class="eyebrow">What you will take away</p><p>Three things you can act on before the week ends.</p></div>
            <div class="ed-highlights">
              <article v-for="(item, index) in event.highlights" :key="item.title" class="ed-highlight">
                <span class="ed-highlight__number">{{ String(index + 1).padStart(2, '0') }}</span>
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
              </article>
            </div>
          </div>

          <div v-if="event.agenda?.length" class="ed-block">
            <div class="ed-block__heading"><p class="eyebrow">The run of show</p><p>How the {{ event.type.toLowerCase() }} unfolds, hour by hour.</p></div>
            <ol class="ed-agenda">
              <li v-for="slot in event.agenda" :key="slot.time">
                <span class="ed-agenda__time">{{ slot.time }}</span>
                <div><h3>{{ slot.title }}</h3><p>{{ slot.text }}</p></div>
              </li>
            </ol>
          </div>

          <div class="ed-block">
            <div class="ed-block__heading"><p class="eyebrow">From the community</p><p>Moments from Cleva gatherings across our campuses.</p></div>
            <div class="ed-gallery">
              <div v-for="image in gallery" :key="image.src" class="ed-gallery__image"><img :src="image.src" :alt="image.alt" /></div>
            </div>
          </div>
        </div>

        <aside class="ed-side" data-aos="fade-up">
          <div class="ed-side__card">
            <p class="eyebrow">Event details</p>
            <div class="ed-side__list">
              <div class="ed-side__row"><CalendarDays :size="18" /><div><small>Date</small><b>{{ longDate(event.date) }}</b></div></div>
              <div class="ed-side__row"><Clock :size="18" /><div><small>Time</small><b>{{ event.time }}</b></div></div>
              <div class="ed-side__row"><MapPin :size="18" /><div><small>Venue</small><b>{{ event.venue }}</b></div></div>
              <div class="ed-side__row"><GraduationCap :size="18" /><div><small>Campus</small><b>{{ event.campus }}</b></div></div>
              <div class="ed-side__row"><Sparkles :size="18" /><div><small>Format</small><b>{{ event.type }}</b></div></div>
              <div v-if="event.seats" class="ed-side__row"><Users :size="18" /><div><small>Capacity</small><b>{{ event.seats }}</b></div></div>
            </div>
            <button class="app-button app-button--primary ed-side__button" type="button"><Ticket :size="17" /> Registration opens soon</button>
            <p class="helper-text">This prototype does not process registrations yet.</p>
          </div>
        </aside>
      </div>
    </section>

    <section v-if="related.length" class="section section--warm">
      <div class="container">
        <div class="related-heading" data-aos="fade-up"><div><p class="eyebrow">Keep the momentum</p><h2>More moments to join.</h2></div><RouterLink class="section-link" to="/events">See the full calendar <ArrowRight :size="17" /></RouterLink></div>
        <div class="evx-grid evx-grid--related"><EventCard v-for="item in related" :key="item.id" :event="item" /></div>
      </div>
    </section>

    <section class="section section--ink events-close">
      <div class="container split-callout">
        <div data-aos="fade-right"><p class="eyebrow eyebrow--light">Never miss a moment</p><h2>Bring Cleva <em>to your campus.</em></h2><p>Campus leads run the meetups, workshops, and conversations that make this network feel local. Tell us where you study and we will help you get the next one on the calendar.</p><RouterLink class="app-button app-button--accent" to="/campus-leads">Meet the campus leads <ArrowRight :size="17" /></RouterLink></div>
        <div class="events-close__card" data-aos="fade-left"><img :src="galleryTwo" alt="Cleva campus lead welcoming students at an event" /><span class="events-close__card__tag">Your campus<br /><b>could be next</b></span></div>
      </div>
    </section>
  </div>
  <div v-else class="empty-state page-empty"><h2>Event not found</h2><RouterLink class="text-link" to="/events">Return to events</RouterLink></div>
</template>
