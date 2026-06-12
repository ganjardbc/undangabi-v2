<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const slug = computed(() => String(route.params.slug ?? 'undangan'));
const guestName = computed(() => {
  const value = route.query.to;
  return typeof value === 'string' && value.trim() ? value : 'Tamu Undangan';
});
</script>

<template>
  <main class="public-page">
    <section class="invitation-hero">
      <p class="eyebrow">UndangAbi</p>
      <h1>{{ slug }}</h1>
      <p class="guest-line">Untuk {{ guestName }}</p>
      <p class="summary">
        Digital invitation page is ready for SEO-friendly public invitation rendering.
      </p>
    </section>
  </main>
</template>
