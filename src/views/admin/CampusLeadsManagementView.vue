<script setup>
import { computed } from 'vue'
import { Plus, MoreHorizontal } from '@lucide/vue'
import { leads, people } from '../../services/mockData'
import { useAuthStore } from '../../stores/auth'

const auth = useAuthStore()
// Scoped campus leads see every leader role in their community (leads, co-leads,
// ambassadors); admins and the head see the network-wide Campus Lead directory.
const visible = computed(() => (auth.isScoped ? people.filter((p) => p.campusSlug === auth.communitySlug) : leads))
</script>

<template>
  <div class="management-page">
    <div class="page-toolbar">
      <div>
        <h2>Campus leads</h2>
        <p class="muted">{{ auth.isScoped ? 'Leads and ambassadors in ' + auth.communityName + '.' : 'Keep leadership records current and connected to a campus.' }}</p>
      </div>
      <button class="app-button app-button--primary"><Plus :size="17" /> Add lead</button>
    </div>
    <section class="admin-panel">
      <div class="data-table">
        <div class="table-head"><span>Lead</span><span>Campus</span><span>Role</span><span></span></div>
        <div v-for="lead in visible" :key="lead.id" class="table-row">
          <div class="table-person"><span class="avatar">{{ lead.initials }}</span><strong>{{ lead.name }}</strong></div>
          <span>{{ lead.campus }}</span>
          <span class="badge badge--neutral">{{ lead.role }}</span>
          <button class="icon-button" aria-label="More lead actions"><MoreHorizontal :size="18" /></button>
        </div>
      </div>
      <p v-if="!visible.length" class="muted">No leaders recorded for this community yet.</p>
    </section>
  </div>
</template>
