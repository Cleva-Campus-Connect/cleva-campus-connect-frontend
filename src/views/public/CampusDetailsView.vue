<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { ArrowLeft, ArrowRight, CalendarDays, MapPin, Sparkles, Users } from '@lucide/vue'
import { campuses, events, peopleByCampus } from '../../services/mockData'
import EventCard from '../../components/common/EventCard.vue'
import PersonCard from '../../components/common/PersonCard.vue'

const route = useRoute()
const campus = computed(() => campuses.find((item) => item.slug === route.params.slug))
const roleOrder = ['Campus Lead', 'Co-Lead', 'Campus Ambassador']
const team = computed(() => [...peopleByCampus(route.params.slug)].sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role)))
const related = computed(() => events.filter((event) => event.campus === campus.value?.name))
const longDate = (date) => new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })
</script>
<template>
  <div v-if="campus" class="campus-page">
    <section class="cdet-hero" :style="{ '--campus-color': campus.color }">
      <div class="container">
        <RouterLink class="back-link back-link--light" to="/campuses"><ArrowLeft :size="16" /> All campuses</RouterLink>
        <div class="cdet-hero__grid">
          <div class="cdet-hero__copy" data-aos="fade-right">
            <span class="cdet-hero__mark">{{ campus.shortName }}</span>
            <p class="eyebrow eyebrow--light">{{ campus.status }}</p>
            <h1>{{ campus.name }}</h1>
            <p class="cdet-hero__text">{{ campus.description }}</p>
            <div class="cdet-hero__meta">
              <span><MapPin :size="16" />{{ campus.city }}, {{ campus.state }}</span>
              <span><Users :size="16" />{{ campus.members }} members</span>
              <span><Sparkles :size="16" />Since {{ campus.since }}</span>
            </div>
          </div>
          <div class="cdet-hero__visual" data-aos="fade-left">
            <img class="cdet-hero__image" :src="campus.image" :alt="`Cleva community at ${campus.name}`" />
            <span class="cdet-hero__tag">Your campus<br /><b>in motion</b></span>
          </div>
        </div>
      </div>
    </section>

    <section class="section cdet-team">
      <div class="container">
        <div class="related-heading" data-aos="fade-up">
          <div><p class="eyebrow">The people to know</p><h2>Meet the {{ campus.shortName }} team.</h2></div>
          <p class="section-heading__description cdet-team__note">Lead, co-lead, and campus ambassador — tap any profile to learn more about them.</p>
        </div>
        <div v-if="team.length" class="pcard-grid">
          <PersonCard v-for="person in team" :key="person.id" :person="person" />
        </div>
        <div v-else class="empty-state"><h3>Leadership team forming</h3><p>This campus is preparing to launch. Check back soon for the founding team.</p></div>
      </div>
    </section>

    <section class="section section--warm cdet-events">
      <div class="container">
        <div class="related-heading" data-aos="fade-up">
          <div><p class="eyebrow">Happening here</p><h2>Upcoming at {{ campus.shortName }}.</h2></div>
          <RouterLink class="section-link" to="/events">See the full calendar <ArrowRight :size="17" /></RouterLink>
        </div>
        <div v-if="related.length" class="ex-grid ex-grid--related">
          <EventCard v-for="event in related" :key="event.id" :event="event" />
        </div>
        <div v-else class="empty-state"><h3>New events are being planned</h3><p>The {{ campus.shortName }} team is cooking something up. Join the community so you do not miss it.</p></div>
      </div>
    </section>

    <section class="section cdet-body">
      <div class="container cdet-body__grid">
        <div data-aos="fade-up">
          <p class="eyebrow">About this community</p>
          <h2>Make your campus feel a little closer.</h2>
          <p class="large-copy">{{ campus.description }} Join conversations, meet people who are figuring things out too, and find your next opportunity.</p>
          <RouterLink class="app-button app-button--primary" to="/referrals">Join the referral challenge <ArrowRight :size="17" /></RouterLink>
        </div>
        <div class="cdet-body__panel" data-aos="fade-up">
          <p class="eyebrow">Next gathering</p>
          <div v-if="related.length" class="cdet-next">
            <span class="cdet-next__date"><strong>{{ new Date(related[0].date).toLocaleDateString('en-US', { day: '2-digit' }) }}</strong><small>{{ new Date(related[0].date).toLocaleDateString('en-US', { month: 'short' }) }}</small></span>
            <div class="cdet-next__info">
              <b>{{ related[0].title }}</b>
              <small><CalendarDays :size="13" />{{ longDate(related[0].date) }} · {{ related[0].time }}</small>
              <small><MapPin :size="13" />{{ related[0].venue }}</small>
            </div>
            <RouterLink class="text-link" :to="`/events/${related[0].slug}`">View <ArrowRight :size="15" /></RouterLink>
          </div>
          <p v-else class="muted">Dates drop soon. Follow the {{ campus.shortName }} team to hear first.</p>
        </div>
      </div>
    </section>

    <section class="section section--ink events-close">
      <div class="container split-callout">
        <div data-aos="fade-right"><p class="eyebrow eyebrow--light">Never miss a moment</p><h2>Bring Cleva <em>to your campus.</em></h2><p>Campus leads run the meetups, workshops, and conversations that make this network feel local. Tell us where you study and we will help you get the next one on the calendar.</p><RouterLink class="app-button app-button--accent" to="/campus-leads">Meet the campus leads <ArrowRight :size="17" /></RouterLink></div>
        <div class="events-close__card" data-aos="fade-left"><img :src="campus.image" :alt="`Cleva community moment at ${campus.name}`" /><span class="events-close__card__tag">{{ campus.shortName }}<br /><b>could be next</b></span></div>
      </div>
    </section>
  </div>
  <div v-else class="empty-state page-empty"><h2>Campus not found</h2><RouterLink class="text-link" to="/campuses">Return to campuses <ArrowRight :size="16" /></RouterLink></div>
</template>
