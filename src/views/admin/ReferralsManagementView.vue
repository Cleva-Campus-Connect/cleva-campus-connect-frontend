<script setup>
import { Download, Trophy } from '@lucide/vue'
import { referrals } from '../../services/mockData'
</script>
<template><div class="management-page"><div class="page-toolbar"><div><h2>Referral activity</h2><p class="muted">Review mock referral records before connecting a verified backend.</p></div><button class="app-button app-button--secondary"><Download :size="17" /> Export</button></div><section class="admin-panel"><div class="panel-heading"><div><p class="eyebrow">Leaderboard</p><h3>Community builders</h3></div><Trophy :size="20" /></div><div class="data-table"><div class="table-head"><span>Referrer</span><span>Campus</span><span>Referrals</span><span>Status</span></div><div v-for="person in referrals" :key="person.id" class="table-row"><strong>{{ person.name }}</strong><span>{{ person.campus }}</span><b>{{ person.referrals }}</b><span class="badge badge--success">{{ person.status }}</span></div></div></section></div></template>
