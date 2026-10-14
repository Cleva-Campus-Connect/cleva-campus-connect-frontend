
import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '../stores/auth'
import PublicLayout from '../components/layout/PublicLayout.vue'
import AuthLayout from '../components/layout/AuthLayout.vue'
import AdminLayout from '../components/layout/AdminLayout.vue'
import HomeView from '../views/public/HomeView.vue'
import CampusesView from '../views/public/CampusesView.vue'
import CampusDetailsView from '../views/public/CampusDetailsView.vue'
import PersonDetailsView from '../views/public/PersonDetailsView.vue'
import EventsView from '../views/public/EventsView.vue'
import EventDetailsView from '../views/public/EventDetailsView.vue'
import CampusLeadsView from '../views/public/CampusLeadsView.vue'
import ReferralChallengeView from '../views/public/ReferralChallengeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import ForgotPasswordView from '../views/auth/ForgotPasswordView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import DashboardView from '../views/admin/DashboardView.vue'
import CampusesManagementView from '../views/admin/CampusesManagementView.vue'
import CampusLeadsManagementView from '../views/admin/CampusLeadsManagementView.vue'
import EventsManagementView from '../views/admin/EventsManagementView.vue'
import MemberCountsView from '../views/admin/MemberCountsView.vue'
import ReferralsManagementView from '../views/admin/ReferralsManagementView.vue'
import AnalyticsView from '../views/admin/AnalyticsView.vue'
import SettingsView from '../views/admin/SettingsView.vue'
import AccessDeniedView from '../views/AccessDeniedView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [{ path: '/', component: PublicLayout, children: [
  { path: '', name: 'home', component: HomeView },
  { path: 'campuses', name: 'campuses', component: CampusesView },
  { path: 'campuses/:slug', name: 'campus-details', component: CampusDetailsView },
  { path: 'people/:slug', name: 'person-details', component: PersonDetailsView },
  { path: 'events', name: 'events', component: EventsView },
  { path: 'events/:slug', name: 'event-details', component: EventDetailsView },
  { path: 'campus-leads', name: 'campus-leads', component: CampusLeadsView },
  { path: 'referrals', name: 'referrals', component: ReferralChallengeView },
]}, { path: '/', component: AuthLayout, children: [
  { path: 'login', name: 'login', component: LoginView },
  { path: 'forgot-password', name: 'forgot-password', component: ForgotPasswordView },
  { path: 'register', name: 'register', component: RegisterView },
]}, { path: '/admin', component: AdminLayout, meta: { requiresAuth: true }, children: [
  { path: '', name: 'admin', component: DashboardView, meta: { title: 'Overview', section: 'dashboard' } },
  { path: 'campuses', component: CampusesManagementView, meta: { title: 'Campuses', section: 'campuses' } },
  { path: 'campus-leads', component: CampusLeadsManagementView, meta: { title: 'Campus leads', section: 'campus-leads' } },
  { path: 'events', component: EventsManagementView, meta: { title: 'Events', section: 'events' } },
  { path: 'member-counts', component: MemberCountsView, meta: { title: 'Member counts', section: 'member-counts' } },
  { path: 'referrals', component: ReferralsManagementView, meta: { title: 'Referrals', section: 'referrals' } },
  { path: 'analytics', component: AnalyticsView, meta: { title: 'Analytics', section: 'analytics' } },
  { path: 'settings', component: SettingsView, meta: { title: 'Settings', section: 'settings' } },
]}, { path: '/403', name: 'forbidden', component: AccessDeniedView }, { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) return { name: 'login', query: { redirect: to.fullPath } }
  if (to.name === 'login' && auth.isAuthenticated) return { name: 'admin' }
  // Demo role gating: hide sections a role may not open. A real backend must
  // enforce the same rules on every protected request, not just in the UI.
  if (to.meta.section && auth.isAuthenticated && !auth.can(to.meta.section)) return { name: 'admin' }
})

export default router
