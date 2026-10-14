<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { Menu, X, ArrowUpRight } from '@lucide/vue'

const route = useRoute()
const open = ref(false)
const links = [
  { label: 'Home', to: '/' },
  { label: 'Campuses', to: '/campuses' },
  { label: 'Events', to: '/events' },
  { label: 'Campus leads', to: '/campus-leads' },
  { label: 'Referrals', to: '/referrals' },
]
const close = () => { open.value = false }
</script>

<template>
  <div class="public-shell">
    <header class="site-header"><div class="site-header__inner">
      <RouterLink class="brand brand--light" to="/" @click="close"><img class="brand-mark" src="/cleva-logo.465e8a1e.svg" alt="Cleva" /></RouterLink>
      <button class="icon-button mobile-menu" aria-label="Toggle navigation" @click="open = !open"><X v-if="open" :size="21" /><Menu v-else :size="21" /></button>
      <nav class="site-nav" :class="{ 'site-nav--open': open }">
        <RouterLink v-for="link in links" :key="link.to" :to="link.to" :class="{ active: route.path === link.to }" @click="close">{{ link.label }}</RouterLink>
        <span class="nav-actions"><RouterLink class="nav-login" to="/login" @click="close">Log in</RouterLink><RouterLink class="nav-register" to="/register" @click="close">Register <ArrowUpRight :size="15" /></RouterLink></span>
      </nav>
    </div>
    </header>
    <main><RouterView /></main>
    <footer class="site-footer"><div class="site-footer__top"><div class="site-footer__brand"><RouterLink class="brand brand--light" to="/"><img class="brand-mark" src="/cleva-logo.465e8a1e.svg" alt="Cleva" /></RouterLink><p>Find your people. Build what is next.</p><a class="footer-contact" href="mailto:contact@getcleva.com">contact@getcleva.com</a></div><div><p class="footer-label">Explore</p><div class="footer-links"><RouterLink to="/campuses">Campuses</RouterLink><RouterLink to="/events">Events</RouterLink><RouterLink to="/campus-leads">Campus leads</RouterLink></div><p class="footer-label footer-label--legal">Legal</p><div class="footer-links footer-links--stack"><a href="https://www.getcleva.com/legal" target="_blank" rel="noreferrer">Privacy &amp; legal</a><a href="https://www.getcleva.com/legal" target="_blank" rel="noreferrer">Terms of service</a></div></div><div><p class="footer-label">Company</p><div class="footer-links footer-links--stack"><a href="https://www.getcleva.com/multi-currency-account" target="_blank" rel="noreferrer">Products</a><a href="https://www.getcleva.com/blog" target="_blank" rel="noreferrer">Blog</a><a href="https://www.getcleva.com/careers" target="_blank" rel="noreferrer">Careers</a><a href="https://www.getcleva.com/ambassadors" target="_blank" rel="noreferrer">Ambassadors</a></div></div><div><p class="footer-label footer-label--social">Follow Cleva</p><div class="footer-socials"><a href="https://www.instagram.com/clevabanking" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.linkedin.com/company/cleva-banking/about/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://twitter.com/clevabanking" target="_blank" rel="noreferrer">X</a></div><p class="footer-label footer-label--locations">Locations</p><p class="footer-location">945 Market Street, San Francisco, CA 94103<br />9450 Southwest Gemini Drive, Beaverton, OR 97008<br />4 Ayanboye Street, Anthony Village, Lagos</p></div></div><div class="site-footer__bottom"><p class="copyright">© 2026 Cleva Campus Connect.</p></div></footer>
  </div>
</template>
