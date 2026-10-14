<script setup>
import { computed } from 'vue'
import { Plus, MoreHorizontal } from '@lucide/vue'
import { events } from '../../services/mockData'
import { useAuthStore } from '../../stores/auth'

const auth = useAuthStore()
const visible = computed(() => (auth.isScoped ? events.filter((e) => e.campusSlug === auth.communitySlug) : events))
</script>

<template>
  <div class="management-page">
    <div class="page-toolbar">
      <div>
        <h2>Events</h2>
        <p class="muted">{{ auth.isScoped ? 'Events for ' + auth.communityName + '.' : 'Plan and publish useful moments for every community.' }}</p>
      </div>
      <button class="app-button app-button--primary"><Plus :size="17" /> Create event</button>
    </div>
    <section class="admin-panel">
      <div class="data-table">
        <div class="table-head"><span>Event</span><span>Campus</span><span>Date</span><span></span></div>
        <div v-for="event in visible" :key="event.id" class="table-row">
          <strong>{{ event.title }}</strong>
          <span>{{ event.campus }}</span>
          <span>{{ event.date }}</span>
          <button class="icon-button" aria-label="More event actions"><MoreHorizontal :size="18" /></button>
        </div>
      </div>
      <p v-if="!visible.length" class="muted">No events for this community yet.</p>
    </section>
  </div>
</template>
