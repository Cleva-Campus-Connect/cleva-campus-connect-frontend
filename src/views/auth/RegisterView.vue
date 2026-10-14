<script setup>
import { ref, computed } from 'vue'
import { ArrowRight, UserPlus, Check } from '@lucide/vue'
import { RouterLink } from 'vue-router'
import { campuses } from '../../services/mockData'
import { ROLE_OPTIONS } from '../../services/roles'
import AppButton from '../../components/common/AppButton.vue'

const submitted = ref(false)
const role = ref('head-of-campus-leads')
const community = ref(campuses[0].slug)
const scoped = computed(() => ['campus-lead', 'ambassador'].includes(role.value))
</script>

<template>
  <div data-aos="fade-up">
    <span class="auth-icon"><UserPlus :size="23" /></span>
    <p class="eyebrow">Join the workspace</p>
    <h1>Create your operator account.</h1>
    <p class="auth-copy">Set up access for the Cleva Campus Connect admin workspace. Students use the public site and don't need an account.</p>

    <form v-if="!submitted" class="auth-form" @submit.prevent="submitted = true">
      <label>Full name<input required placeholder="Your full name" /></label>
      <label>Work email<input required type="email" placeholder="you@company.com" /></label>
      <label>Role
        <select v-model="role">
          <option v-for="option in ROLE_OPTIONS" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
      </label>
      <label v-if="scoped">Campus
        <select v-model="community">
          <option v-for="campus in campuses" :key="campus.slug" :value="campus.slug">{{ campus.name }}</option>
        </select>
      </label>
      <label>Password<input required type="password" placeholder="Create a password" /></label>
      <AppButton type="submit">Create account <ArrowRight :size="17" /></AppButton>
    </form>

    <div v-else class="success-message">
      <strong><Check :size="16" /> Account ready.</strong>
      <p>Your {{ ROLE_OPTIONS.find((o) => o.value === role)?.label }} access will be provisioned when the backend is connected. This prototype hasn't saved anything.</p>
      <RouterLink class="text-link auth-back" to="/login">Back to sign in</RouterLink>
    </div>

    <p class="auth-switch">Already have an account? <RouterLink class="text-link" to="/login">Log in</RouterLink></p>
    <p class="demo-note">Frontend prototype — no account is created yet.</p>
  </div>
</template>
