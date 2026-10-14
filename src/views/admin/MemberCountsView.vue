<script setup>
import { computed } from 'vue'
import { Users, Building2, Clock } from '@lucide/vue'
import { memberCounts, campuses } from '../../services/mockData'

const rows = computed(() =>
  memberCounts
    .map((item) => {
      const campus = campuses.find((c) => c.slug === item.campusSlug)
      return { ...item, name: campus?.name || item.campusSlug, location: campus ? `${campus.city}, ${campus.state}` : '' }
    })
    .sort((a, b) => b.total - a.total),
)
const max = computed(() => Math.max(...rows.value.map((r) => r.total)))
const total = computed(() => rows.value.reduce((sum, r) => sum + r.total, 0))
const latest = computed(() => rows.value.map((r) => r.recordedAt).sort().reverse()[0])
const pct = (value) => Math.round((value / max.value) * 100)
const fmt = (value) => value.toLocaleString('en-US')
</script>

<template>
  <div class="management-page">
    <div class="page-toolbar">
      <div><h2>Member counts</h2><p class="muted">Recorded community sizes, with the source and date each total was captured.</p></div>
      <span class="mock-pill">Mock data</span>
    </div>

    <div class="stats-grid stats-grid--three">
      <article class="stat-card">
        <span class="stat-icon stat-icon--green"><Users :size="19" /></span>
        <small>Total members</small>
        <strong>{{ fmt(total) }}</strong>
        <span class="stat-trend">Across {{ rows.length }} communities</span>
      </article>
      <article class="stat-card">
        <span class="stat-icon stat-icon--blue"><Building2 :size="19" /></span>
        <small>Communities tracked</small>
        <strong>{{ rows.length }}</strong>
        <span class="stat-trend">Reporting member totals</span>
      </article>
      <article class="stat-card">
        <span class="stat-icon stat-icon--gold"><Clock :size="19" /></span>
        <small>Latest update</small>
        <strong class="stat-date">{{ latest }}</strong>
        <span class="stat-trend">Most recent capture</span>
      </article>
    </div>

    <section class="admin-panel">
      <div class="panel-heading"><div><p class="eyebrow">By community</p><h3>Member totals</h3></div></div>
      <div class="data-table data-table--members">
        <div class="table-head"><span>Community</span><span>Members</span><span>Source</span><span>Recorded</span></div>
        <div v-for="row in rows" :key="row.id" class="table-row">
          <div class="table-person"><div><strong>{{ row.name }}</strong><small>{{ row.location }}</small></div></div>
          <div class="member-cell">
            <b class="row-value">{{ fmt(row.total) }}</b>
            <span class="member-bar"><i :style="{ width: pct(row.total) + '%' }"></i></span>
          </div>
          <span>{{ row.source }}</span>
          <span>{{ row.recordedAt }}</span>
        </div>
      </div>
    </section>
  </div>
</template>
