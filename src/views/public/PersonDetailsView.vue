<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, GraduationCap, Mail, MapPin, Sparkles, Users } from '@lucide/vue'
import { campuses, events, findPerson, peopleByCampus } from '../../services/mockData'
import PersonCard from '../../components/common/PersonCard.vue'

const route = useRoute()
const person = computed(() => findPerson(route.params.slug))
const campus = computed(() => campuses.find((item) => item.slug === person.value?.campusSlug))
const teammates = computed(() => peopleByCampus(person.value?.campusSlug).filter((item) => item.id !== person.value?.id))
const hostedEvents = computed(() => events.filter((event) => event.hosts?.includes(person.value?.id)))
const longDate = (date) => new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })
</script>
<template>
  <div v-if="person" class="person-page">
    <section class="person-hero">
      <div class="container">
        <RouterLink class="back-link back-link--light" :to="`/campuses/${person.campusSlug}`"><ArrowLeft :size="16" /> Back to {{ person.campus }}</RouterLink>
        <div class="person-hero__grid">
          <div class="person-hero__copy" data-aos="fade-right">
            <span class="person-hero__role">{{ person.role }}</span>
            <h1>{{ person.name }}</h1>
            <p class="person-hero__headline">{{ person.headline }}</p>
            <div class="person-hero__meta">
              <span><GraduationCap :size="16" />{{ person.field }} · {{ person.level }}</span>
              <span><MapPin :size="16" />{{ person.location }}</span>
              <span><Sparkles :size="16" />Joined {{ person.joined }}</span>
            </div>
            <div class="person-hero__actions">
              <RouterLink class="app-button app-button--accent" :to="`/campuses/${person.campusSlug}`"><Users :size="17" /> {{ person.campus }}</RouterLink>
              <a class="person-hero__link" :href="`mailto:${person.email}`"><Mail :size="17" /> {{ person.email }}</a>
            </div>
          </div>
          <div class="person-hero__visual" data-aos="fade-left">
            <img class="person-hero__image" :src="person.image" :alt="`${person.name}, ${person.role} at ${person.campus}`" />
            <span class="person-hero__stamp">{{ person.role.split(' ').map((word) => word).join(' ') }}</span>
            <span class="person-hero__initials">{{ person.initials }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section person-body">
      <div class="container person-body__grid">
        <div class="person-body__main" data-aos="fade-up">
          <p class="eyebrow">About {{ person.name.split(' ')[0] }}</p>
          <h2>The story behind the role.</h2>
          <p class="large-copy">{{ person.bio }}</p>

          <div class="person-block">
            <div class="person-block__heading"><p class="eyebrow">Focus areas</p><p>What {{ person.name.split(' ')[0] }} cares about most in the community.</p></div>
            <div class="person-focus">
              <article v-for="(item, index) in person.focus" :key="item" class="person-focus__item">
                <span class="person-focus__number">{{ String(index + 1).padStart(2, '0') }}</span>
                <h3>{{ item }}</h3>
              </article>
            </div>
          </div>

          <div class="person-block">
            <div class="person-block__heading"><p class="eyebrow">Upcoming with {{ person.name.split(' ')[0] }}</p><p>Rooms you will find {{ person.name.split(' ')[0] }} in.</p></div>
            <div v-if="hostedEvents.length" class="person-events">
              <RouterLink v-for="event in hostedEvents" :key="event.id" class="person-event" :to="`/events/${event.slug}`">
                <span class="person-event__date"><CalendarDays :size="18" /></span>
                <span class="person-event__info"><b>{{ event.title }}</b><small>{{ longDate(event.date) }} · {{ event.time }} · {{ event.venue }}</small></span>
                <span class="person-event__type">{{ event.type }}</span>
                <ArrowRight :size="18" />
              </RouterLink>
            </div>
            <p v-else class="muted">No upcoming events on the calendar yet — check back soon.</p>
          </div>
        </div>

        <aside class="person-side" data-aos="fade-up">
          <div class="person-side__card">
            <p class="eyebrow">At a glance</p>
            <div class="person-side__list">
              <div class="person-side__row"><Users :size="18" /><div><small>Role</small><b>{{ person.role }}</b></div></div>
              <div class="person-side__row"><GraduationCap :size="18" /><div><small>Campus</small><b>{{ person.campus }}</b></div></div>
              <div class="person-side__row"><BookOpen :size="18" /><div><small>Course</small><b>{{ person.field }}</b></div></div>
              <div class="person-side__row"><Sparkles :size="18" /><div><small>Level</small><b>{{ person.level }}</b></div></div>
              <div class="person-side__row"><MapPin :size="18" /><div><small>Based in</small><b>{{ person.location }}</b></div></div>
            </div>
            <a class="app-button app-button--primary person-side__button" :href="`mailto:${person.email}`"><Mail :size="17" /> Get in touch</a>
            <p class="helper-text">Reach {{ person.name.split(' ')[0] }} directly for campus questions, partnerships, or just to say hi.</p>
          </div>
          <div class="person-social">
            <p class="eyebrow">Find {{ person.name.split(' ')[0] }} online</p>
            <div class="person-social__links">
              <a v-for="social in person.socials" :key="social.label" :href="social.url" target="_blank" rel="noreferrer">
                <b>{{ social.label }}</b><span>{{ social.handle }}</span><ArrowRight :size="15" />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <section v-if="teammates.length" class="section section--warm person-teammates">
      <div class="container">
        <div class="related-heading" data-aos="fade-up"><div><p class="eyebrow">Same campus</p><h2>The rest of the {{ person.campus }} team.</h2></div><RouterLink class="section-link" :to="`/campuses/${person.campusSlug}`">View campus <ArrowRight :size="17" /></RouterLink></div>
        <div class="pcard-grid"><PersonCard v-for="mate in teammates" :key="mate.id" :person="mate" /></div>
      </div>
    </section>

    <section class="section section--ink events-close">
      <div class="container split-callout">
        <div data-aos="fade-right"><p class="eyebrow eyebrow--light">Join the community</p><h2>Your campus could be <em>next on the map.</em></h2><p>Cleva communities run on students like {{ person.name.split(' ')[0] }}. If your school is not on the list yet, tell us where you study and we will help you start.</p><RouterLink class="app-button app-button--accent" to="/campus-leads">Meet the campus leads <ArrowRight :size="17" /></RouterLink></div>
        <div class="events-close__card" data-aos="fade-left"><img :src="person.image" :alt="`Cleva community moment with ${person.name}`" /><span class="events-close__card__tag">{{ person.campus.split(' ').slice(0, 2).join(' ') }}<br /><b>{{ person.role }}</b></span></div>
      </div>
    </section>
  </div>
  <div v-else class="empty-state page-empty"><h2>Person not found</h2><RouterLink class="text-link" to="/campus-leads">Return to campus leads <ArrowRight :size="16" /></RouterLink></div>
</template>
