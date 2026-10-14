<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowLeft, ArrowRight, MailCheck } from '@lucide/vue'
import AppButton from '../../components/common/AppButton.vue'
const email = ref(''); const sent = ref(false)
</script>
<template><div><span class="auth-icon"><MailCheck :size="23" /></span><p class="eyebrow">Account recovery</p><h1>Reset your password.</h1><p class="auth-copy">Enter your work email and we’ll send a recovery link when backend email delivery is connected.</p><form v-if="!sent" class="auth-form" @submit.prevent="sent = true"><label>Email address<input v-model="email" type="email" placeholder="you@company.com" required /></label><AppButton type="submit">Send recovery link <ArrowRight :size="17" /></AppButton></form><div v-else class="success-message"><strong>Request received.</strong><p>This prototype has not sent an email, but the recovery flow is ready for integration.</p></div><RouterLink class="back-link auth-back" to="/login"><ArrowLeft :size="16" /> Back to sign in</RouterLink></div></template>
