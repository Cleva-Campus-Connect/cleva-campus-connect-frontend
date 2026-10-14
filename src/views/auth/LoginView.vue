<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { Eye, EyeOff, ArrowRight, ShieldCheck } from '@lucide/vue'
import { useAuthStore } from '../../stores/auth'
import { DEMO_ACCOUNTS } from '../../services/authService'
import { roleLabel } from '../../services/roles'
import AppButton from '../../components/common/AppButton.vue'

const email = ref('')
const password = ref('')
const visible = ref(false)
const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const fill = (value) => { email.value = value; auth.error = '' }
const submit = async () => {
  try {
    await auth.login(email.value, password.value)
    router.push(route.query.redirect || '/admin')
  } catch {}
}
</script>

<template>
  <div data-aos="fade-up">
    <span class="auth-icon"><ShieldCheck :size="23" /></span>
    <p class="eyebrow">Admin workspace</p>
    <h1>Welcome back.</h1>
    <p class="auth-copy">Sign in to manage the Cleva Campus Connect network. One account routes you to the right dashboard.</p>

    <form class="auth-form" @submit.prevent="submit">
      <label>Email address
        <input v-model="email" type="email" placeholder="you@company.com" required />
      </label>
      <label>Password
        <span class="password-field">
          <input v-model="password" :type="visible ? 'text' : 'password'" placeholder="Enter your password" required />
          <button type="button" aria-label="Toggle password visibility" @click="visible = !visible">
            <EyeOff v-if="visible" :size="17" /><Eye v-else :size="17" />
          </button>
        </span>
      </label>

      <p v-if="auth.error" class="form-error">{{ auth.error }}</p>
      <AppButton type="submit" :disabled="auth.loading">{{ auth.loading ? 'Signing in...' : 'Sign in' }} <ArrowRight :size="17" /></AppButton>
    </form>

    <RouterLink class="text-link auth-forgot" to="/forgot-password">Forgot your password?</RouterLink>

    <div class="demo-accounts">
      <p class="demo-accounts__label">Demo accounts — each opens a different dashboard</p>
      <ul>
        <li v-for="account in DEMO_ACCOUNTS" :key="account.email">
          <button type="button" @click="fill(account.email)">{{ account.email }}</button>
          <span>{{ roleLabel(account.role) }}</span>
        </li>
      </ul>
    </div>

    <p class="auth-switch">New to the workspace? <RouterLink class="text-link" to="/register">Create an operator account</RouterLink></p>
    <p class="demo-note">Development prototype: pick a demo email, enter any password. Roles are enforced on the server in production.</p>
  </div>
</template>
