<script setup>
import { ref, computed } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { LayoutDashboard, Building2, Users, CalendarDays, Trophy, BarChart3, Settings, LogOut, Menu, X, Activity } from '@lucide/vue'
import { useAuthStore } from '../../stores/auth'
import { ROLE_OPTIONS } from '../../services/roles'
import { campuses } from '../../services/mockData'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const open = ref(false)

const allLinks = [
  { label: 'Overview', to: '/admin', icon: LayoutDashboard, section: 'dashboard' },
  { label: 'Campuses', to: '/admin/campuses', icon: Building2, section: 'campuses' },
  { label: 'Campus leads', to: '/admin/campus-leads', icon: Users, section: 'campus-leads' },
  { label: 'Events', to: '/admin/events', icon: CalendarDays, section: 'events' },
  { label: 'Member counts', to: '/admin/member-counts', icon: Activity, section: 'member-counts' },
  { label: 'Referrals', to: '/admin/referrals', icon: Trophy, section: 'referrals' },
  { label: 'Analytics', to: '/admin/analytics', icon: BarChart3, section: 'analytics' },
  { label: 'Settings', to: '/admin/settings', icon: Settings, section: 'settings' },
]
const links = computed(() => allLinks.filter((link) => auth.can(link.section)))

const selectedRole = ref(auth.role)
const selectedCommunity = ref(auth.communitySlug || campuses[0].slug)
const applyRole = () => auth.setRole(selectedRole.value, selectedCommunity.value)
const initials = computed(() => (auth.user?.name || 'CC').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase())
const logout = () => { auth.logout(); router.push('/login') }
</script>

<template>
  <div class="admin-shell">
    <aside class="admin-sidebar" :class="{ 'admin-sidebar--open': open }">
      <div class="sidebar-top">
        <RouterLink class="brand" to="/admin"><img class="brand-mark" src="/cleva-logo.465e8a1e.svg" alt="Cleva" /></RouterLink>
        <button class="icon-button sidebar-close" @click="open = false"><X :size="20" /></button>
      </div>
      <p class="sidebar-label">Workspace</p>
      <nav>
        <RouterLink v-for="link in links" :key="link.to" :to="link.to" :class="{ active: route.path === link.to }" @click="open = false">
          <component :is="link.icon" :size="18" />{{ link.label }}
        </RouterLink>
      </nav>
      <div class="sidebar-foot">
        <div class="sidebar-demo">
          <p class="sidebar-demo__label">Demo role</p>
          <select v-model="selectedRole" class="sidebar-select" @change="applyRole">
            <option v-for="option in ROLE_OPTIONS" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
          <select v-if="auth.isScoped" v-model="selectedCommunity" class="sidebar-select" @change="applyRole">
            <option v-for="campus in campuses" :key="campus.slug" :value="campus.slug">{{ campus.name }}</option>
          </select>
          <p class="sidebar-demo__scope">{{ auth.roleConfig?.blurb }}</p>
        </div>
        <button class="sidebar-logout" @click="logout"><LogOut :size="17" />Sign out</button>
      </div>
    </aside>
    <div class="admin-content">
      <header class="admin-header">
        <button class="icon-button admin-menu" @click="open = true"><Menu :size="21" /></button>
        <div>
          <p class="eyebrow">Cleva Campus Connect</p>
          <h1>{{ route.meta.title || 'Overview' }}</h1>
        </div>
        <div class="admin-user">
          <span class="avatar">{{ initials }}</span>
          <div>
            <strong>{{ auth.user?.name || 'Admin' }}</strong>
            <small>{{ auth.roleLabel }}<template v-if="auth.isScoped"> · {{ auth.communityName }}</template></small>
          </div>
        </div>
      </header>
      <main class="admin-main"><RouterView /></main>
    </div>
  </div>
</template>
