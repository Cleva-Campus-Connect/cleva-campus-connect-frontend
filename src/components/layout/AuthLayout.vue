<script setup>
import visual from '../../assets/Images/ambassador1.webp'
</script>

<template>
  <div class="auth-split">
    <aside class="auth-visual" :style="{ backgroundImage: `url(${visual})` }">
      <RouterLink class="brand brand--light" to="/"><img class="brand-mark" src="/cleva-logo.465e8a1e.svg" alt="Cleva" /></RouterLink>
      <div class="auth-visual__copy">
        <p class="eyebrow eyebrow--light">Cleva Campus Connect</p>
        <h2>Run the whole network from one place.</h2>
        <p>Communities, events, campus leads, referrals, member counts, and growth — built for the head of campus leads and authorised operators.</p>
      </div>
      <p class="auth-visual__foot">Cleva Ambassadors Program · Team 4</p>
    </aside>

    <main class="auth-form-side">
      <RouterLink class="brand auth-mobile-brand" to="/"><img class="brand-mark" src="/cleva-logo-dark.svg" alt="Cleva" /></RouterLink>
      <div class="auth-panel"><RouterView /></div>
      <p class="auth-note">Administrative workspace · Frontend prototype</p>
    </main>
  </div>
</template>
