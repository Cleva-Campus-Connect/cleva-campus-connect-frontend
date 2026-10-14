// Role model from the PRD. `sections` are the admin workspace areas each role may
// open. `scoped` roles only ever see data for their own community. In a real build
// every one of these checks is enforced on the server; here they drive the UI demo.
export const ROLES = {
  'super-admin': {
    label: 'Super Admin',
    blurb: 'Everything: records, roles, settings',
    scoped: false,
    sections: ['dashboard', 'campuses', 'campus-leads', 'events', 'member-counts', 'referrals', 'analytics', 'settings'],
  },
  'head-of-campus-leads': {
    label: 'Head of Campus Leads',
    blurb: 'All communities, events, leads, referrals, analytics',
    scoped: false,
    sections: ['dashboard', 'campuses', 'campus-leads', 'events', 'member-counts', 'referrals', 'analytics'],
  },
  'campus-lead': {
    label: 'Campus Lead',
    blurb: "Their own community's events, leads, and ambassadors",
    scoped: true,
    sections: ['dashboard', 'campus-leads', 'events'],
  },
  ambassador: {
    label: 'Ambassador',
    blurb: "Their own community's events and details",
    scoped: true,
    sections: ['dashboard', 'events'],
  },
}

export const ROLE_OPTIONS = Object.entries(ROLES).map(([value, role]) => ({ value, label: role.label, blurb: role.blurb }))
export const roleLabel = (role) => ROLES[role]?.label || 'Operator'
