# Cleva Campus Connect

A Vue 3 + Vite frontend for discovering Cleva campus communities, events, campus leads, and the referral challenge. The project includes public, authentication, and protected admin experiences.

## Setup

```sh
npm install
npm run dev
```

Build for production with `npm run build`.

## Routes

- Public: `/`, `/campuses`, `/campuses/:slug`, `/events`, `/events/:slug`, `/campus-leads`, `/referrals`
- Auth: `/login`, `/forgot-password`
- Admin: `/admin`, `/admin/campuses`, `/admin/campus-leads`, `/admin/events`, `/admin/referrals`, `/admin/analytics`, `/admin/settings`
- Utility: `/403` and the catch-all not-found route

## Prototype boundary

Records currently come from `src/services/mockData.js` through small service modules. Admin forms, referral tracking, event registration, password recovery, and analytics are UI-ready but do not persist data or send messages yet. The login screen is a development-only mock: any non-empty email and password are accepted, and no credentials are stored.

Connect the service modules to a real backend before treating authentication, permissions, referrals, or registration as authoritative. Backend authorization must independently enforce every protected operation.

## Design system

Cleva colors and typography are centralized in `src/assets/base.css`. Montserrat is used for headings and Inter for body/UI text. Shared interface pieces live under `src/components/common` and the public/admin/auth shells live under `src/components/layout`.
