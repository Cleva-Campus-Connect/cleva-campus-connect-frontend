<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowUpRight, Building2, CalendarDays, Users, Activity, TrendingUp } from '@lucide/vue'
import { campuses, events, referrals, leads, memberCounts, memberCountFor } from '../../services/mockData'
import { useAuthStore } from '../../stores/auth'

const auth = useAuthStore()
const scopedCampuses = computed(() => (auth.isScoped ? campuses.filter((c) => c.slug === auth.communitySlug) : campuses))
const scopedLeads = computed(() => (auth.isScoped ? leads.filter((l) => l.campusSlug === auth.communitySlug) : leads))
const scopedEvents = computed(() => (auth.isScoped ? events.filter((e) => e.campusSlug === auth.communitySlug) : events))
const scopedReferrals = computed(() => (auth.isScoped ? referrals.filter((r) => r.campus === auth.communityName) : referrals))
const memberTotal = computed(() =>
  auth.isScoped ? memberCountFor(auth.communitySlug)?.total || 0 : memberCounts.reduce((sum, m) => sum + m.total, 0),
)
const fmt = (value) => value.toLocaleString('en-US')
</script>

<template>
  <div class="dashboard-page">
    <div class="page-toolbar">
      <div>
        <h2>{{ auth.isScoped ? auth.communityName : 'Good morning, operator.' }}</h2>
        <p class="muted">{{ auth.isScoped ? auth.roleLabel + ' view — scoped to your community.' : 'Here’s the latest pulse of your campus network.' }}</p>
      </div>
      <span class="scope-pill">{{ auth.roleLabel }}<template v-if="auth.isScoped"> · {{ auth.communityName }}</template></span>
    </div>

    <div class="stats-grid">
      <article class="stat-card">
        <span class="stat-icon stat-icon--blue"><Building2 :size="19" /></span>
        <small>{{ auth.isScoped ? 'Your community' : 'Total campuses' }}</small>
        <strong>{{ scopedCampuses.length }}</strong>
        <span class="stat-trend" v-if="!auth.isScoped"><TrendingUp :size="14" /> +2 this quarter</span>
      </article>
      <article class="stat-card">
        <span class="stat-icon stat-icon--gold"><Users :size="19" /></span>
        <small>Campus leads</small>
        <strong>{{ scopedLeads.length }}</strong>
        <span class="stat-trend">{{ auth.isScoped ? 'In this community' : 'Across the network' }}</span>
      </article>
      <article class="stat-card">
        <span class="stat-icon stat-icon--orange"><CalendarDays :size="19" /></span>
        <small>Upcoming events</small>
        <strong>{{ scopedEvents.length }}</strong>
        <span class="stat-trend">{{ scopedEvents.length ? 'Next: ' + scopedEvents[0].campus : 'No events yet' }}</span>
      </article>
      <article class="stat-card">
        <span class="stat-icon stat-icon--green"><Activity :size="19" /></span>
        <small>Total members</small>
        <strong>{{ fmt(memberTotal) }}</strong>
        <span class="stat-trend"><TrendingUp :size="14" /> Growing</span>
      </article>
    </div>

    <div class="admin-columns">
      <section class="admin-panel">
        <div class="panel-heading">
          <div><p class="eyebrow">Upcoming</p><h3>Events on the calendar</h3></div>
          <RouterLink v-if="auth.can('events')" class="text-link" to="/admin/events">View all <ArrowUpRight :size="15" /></RouterLink>
        </div>
        <div v-for="event in scopedEvents" :key="event.id" class="admin-list-row">
          <span class="date-block"><b>{{ new Date(event.date).getDate() }}</b><small>{{ new Date(event.date).toLocaleDateString('en-US', { month: 'short' }) }}</small></span>
          <div><strong>{{ event.title }}</strong><small>{{ event.campus }} · {{ event.venue }}</small></div>
        </div>
        <p v-if="!scopedEvents.length" class="muted">No upcoming events for this community yet.</p>
      </section>

      <section class="admin-panel">
        <div class="panel-heading">
          <div><p class="eyebrow">Recent activity</p><h3>Referral leaderboard</h3></div>
          <RouterLink v-if="auth.can('referrals')" class="text-link" to="/admin/referrals">Manage <ArrowUpRight :size="15" /></RouterLink>
        </div>
        <div v-for="(person, index) in scopedReferrals" :key="person.id" class="admin-list-row">
          <span class="rank">0{{ index + 1 }}</span>
          <div><strong>{{ person.name }}</strong><small>{{ person.campus }}</small></div>
          <b class="row-value">{{ person.referrals }}</b>
        </div>
        <p v-if="!scopedReferrals.length" class="muted">No referral activity recorded yet.</p>
      </section>
    </div>
  </div>
</template>
