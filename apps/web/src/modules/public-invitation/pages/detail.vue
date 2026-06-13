<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePublicInvitationStore } from '../stores/public-invitation.store';

const route = useRoute();
const publicInvitationStore = usePublicInvitationStore();

const slug = computed(() => String(route.params.slug ?? 'undangan'));
const invitation = computed(() => publicInvitationStore.invitation);
const guestName = computed(() => {
  const value = route.query.to;
  return typeof value === 'string' && value.trim() ? value : 'Tamu Undangan';
});

const setMetaTag = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const updatePageMeta = (data: any) => {
  if (typeof document === 'undefined') return;

  const title = data.seoTitle || data.title || 'Undangan Digital';
  const description = data.seoDescription || data.story || 'Undangan digital dari UndangAbi';
  const ogImage = data.ogImageUrl || data.coverImageUrl || '';

  document.title = title;
  setMetaTag('description', description);
  setMetaTag('og:title', title, 'property');
  setMetaTag('og:description', description, 'property');
  if (ogImage) {
    setMetaTag('og:image', ogImage, 'property');
    setMetaTag('og:image:width', '1200', 'property');
    setMetaTag('og:image:height', '630', 'property');
  }
  setMetaTag('og:site_name', 'UndangAbi', 'property');
  setMetaTag('og:type', 'website', 'property');
};

onMounted(async () => {
  const data = await publicInvitationStore.fetchInvitation(slug.value);
  updatePageMeta(data);
});
</script>

<template>
  <main class="public-page">
    <section v-if="publicInvitationStore.loading" class="invitation-hero">
      <p class="eyebrow">UndangAbi</p>
      <h1>Loading invitation...</h1>
    </section>

    <section v-else-if="publicInvitationStore.error" class="invitation-hero">
      <p class="eyebrow">Invitation unavailable</p>
      <h1>Undangan tidak tersedia</h1>
      <p class="summary">{{ publicInvitationStore.error }}</p>
    </section>

    <template v-else-if="invitation">
      <section class="invitation-hero" :style="invitation.coverImageUrl ? { backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.45), rgba(17, 24, 39, 0.45)), url(${invitation.coverImageUrl})` } : undefined">
        <p class="eyebrow">UndangAbi</p>
        <h1>{{ invitation.title }}</h1>
        <p class="guest-line">Untuk {{ guestName }}</p>
        <p class="summary">{{ invitation.eventType }}</p>
      </section>

      <section v-if="invitation.story" class="public-section">
        <p class="eyebrow">Story</p>
        <h2>Cerita Kami</h2>
        <p>{{ invitation.story }}</p>
      </section>

      <section v-if="invitation.youtubeUrl" class="public-section">
        <p class="eyebrow">Video</p>
        <h2>Video</h2>
        <a :href="invitation.youtubeUrl" target="_blank" rel="noreferrer">Buka video undangan</a>
      </section>

      <section v-if="invitation.musicUrl" class="public-section">
        <p class="eyebrow">Music</p>
        <h2>Background Music</h2>
        <audio :src="invitation.musicUrl" controls class="audio-player"></audio>
      </section>
    </template>
  </main>
</template>

<style scoped>
.public-page {
  min-height: 100vh;
  background: #f8f9fc;
  color: #111827;
}

.invitation-hero {
  display: grid;
  min-height: 100vh;
  place-content: center;
  gap: 16px;
  padding: 32px;
  background-color: #111827;
  background-position: center;
  background-size: cover;
  color: #ffffff;
  text-align: center;
}

.invitation-hero h1 {
  max-width: 760px;
  margin: 0;
  font-size: clamp(42px, 8vw, 92px);
  line-height: 1;
}

.eyebrow {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.guest-line,
.summary {
  margin: 0;
  font-size: 18px;
}

.public-section {
  max-width: 760px;
  margin: 0 auto;
  padding: 64px 24px;
  text-align: center;
}

.public-section h2 {
  margin: 8px 0 16px;
  font-size: 32px;
}

.public-section p {
  color: #374151;
  line-height: 1.8;
}

.public-section a {
  color: #3051b8;
  font-weight: 700;
}

.audio-player {
  width: 100%;
}
</style>
