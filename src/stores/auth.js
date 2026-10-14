import { defineStore } from 'pinia'
import { authService } from '../services/authService'
import { campuses } from '../services/mockData'
import { ROLES } from '../services/roles'

export const useAuthStore = defineStore('auth', {
  state: () => ({ user: null, loading: false, error: '' }),
  getters: {
    isAuthenticated: (state) => Boolean(state.user),
    role: (state) => state.user?.role || null,
    roleLabel: (state) => state.user?.roleLabel || 'Operator',
    roleConfig: (state) => ROLES[state.user?.role] || null,
    isScoped: (state) => Boolean(ROLES[state.user?.role]?.scoped),
    sections: (state) => ROLES[state.user?.role]?.sections || [],
    communitySlug: (state) => state.user?.communitySlug || null,
    communityName: (state) => state.user?.communityName || 'All communities',
  },
  actions: {
    async login(email, password) {
      this.loading = true
      this.error = ''
      try {
        this.user = await authService.login(email, password)
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    // Demo-only role switcher so the role-scoped sidebar can be previewed live.
    // A real deployment derives the role from the session set by the server.
    setRole(role, communitySlug) {
      if (!this.user) return
      const config = ROLES[role]
      const slug = config?.scoped ? communitySlug || this.user.communitySlug || campuses[0].slug : null
      const campus = campuses.find((item) => item.slug === slug)
      this.user = {
        ...this.user,
        role,
        roleLabel: config?.label || 'Operator',
        communitySlug: slug || null,
        communityName: campus ? campus.name : 'All communities',
      }
    },
    can(section) {
      return this.sections.includes(section)
    },
    logout() {
      this.user = null
    },
  },
})
