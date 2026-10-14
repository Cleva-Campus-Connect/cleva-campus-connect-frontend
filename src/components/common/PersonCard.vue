<script setup>
import { RouterLink } from 'vue-router'
import { ArrowUpRight, MapPin } from '@lucide/vue'
defineProps({ person: { type: Object, required: true } })
</script><template><article class="pcard" data-aos="fade-up">
  <RouterLink class="pcard__media" :to="`/people/${person.id}`">
    <img :src="person.image" :alt="`${person.name}, ${person.role} at ${person.campus}`" />
    <span class="pcard__role">{{ person.role }}</span>
  </RouterLink>
  <div class="pcard__body">
    <p class="pcard__campus"><MapPin :size="14" />{{ person.campus }}</p>
    <h3><RouterLink :to="`/people/${person.id}`">{{ person.name }}</RouterLink></h3>
    <p class="pcard__headline">{{ person.headline }}</p>
    <RouterLink class="pcard__link" :to="`/people/${person.id}`">View profile <ArrowUpRight :size="16" /></RouterLink>
  </div>
</article></template>
