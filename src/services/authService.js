import { campuses } from './mockData'
import { ROLES } from './roles'

// Demo accounts. The prototype has no backend, so a real API lookup is mocked by
// matching the email to a role. The form is shared by every role: it checks the
// credentials and the returned role decides which dashboard the user lands on.
// Connecting a real backend must replace this and verify role + password server-side.
const ACCOUNTS = {
  'super@cleva.demo': { name: 'Ada Global', role: 'super-admin' },
  'head@cleva.demo': { name: 'Campus Operations', role: 'head-of-campus-leads' },
  'lead@cleva.demo': { name: 'Amaka Nwosu', role: 'campus-lead', communitySlug: 'university-of-lagos' },
  'ambassador@cleva.demo': { name: 'Zainab Ibrahim', role: 'ambassador', communitySlug: 'university-of-lagos' },
}

export const DEMO_ACCOUNTS = Object.entries(ACCOUNTS).map(([email, account]) => ({ email, role: account.role }))

export const authService = {
  async login(email, password) {
    if (!email || !password) throw new Error('Enter your email and password.')
    const account = ACCOUNTS[email.trim().toLowerCase()]
    if (!account) throw new Error('No account for that email. Use one of the demo addresses below.')
    const config = ROLES[account.role]
    const campus = campuses.find((item) => item.slug === account.communitySlug)
    return {
      name: account.name,
      email,
      role: account.role,
      roleLabel: config.label,
      communitySlug: account.communitySlug || null,
      communityName: campus ? campus.name : 'All communities',
    }
  },
}
