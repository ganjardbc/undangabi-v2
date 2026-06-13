<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import GeneralBuilderSection from '../components/GeneralBuilderSection.vue';
import StoryBuilderSection from '../components/StoryBuilderSection.vue';
import CoverBuilderSection from '../components/CoverBuilderSection.vue';
import MusicBuilderSection from '../components/MusicBuilderSection.vue';
import SeoBuilderSection from '../components/SeoBuilderSection.vue';
import { useInvitationStore } from '../stores/invitation.store';
import { useUiStore } from '../../../shared/stores/ui.store';

const route = useRoute();
const invitationStore = useInvitationStore();
const uiStore = useUiStore();
const activeTab = ref('general');
const localError = ref<string | null>(null);
const successMessage = ref<string | null>(null);

const form = ref({
  title: '',
  slug: '',
  event_type: 'wedding',
  cover_image_url: '',
  music_url: '',
  youtube_url: '',
  story: '',
  seo_title: '',
  seo_description: '',
  og_image_url: '',
});

const invitationId = computed(() => route.params.id as string);

const tabs = [
  { key: 'general', label: 'General' },
  { key: 'cover', label: 'Cover' },
  { key: 'music', label: 'Music' },
  { key: 'events', label: 'Events' },
  { key: 'theme', label: 'Theme' },
  { key: 'story', label: 'Story' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'gift', label: 'Gift' },
  { key: 'seo', label: 'SEO' },
  { key: 'publish', label: 'Publish' },
];

const loadInvitation = async () => {
  const invitation = await invitationStore.fetchInvitation(invitationId.value);
  if (!invitation) return;

  form.value = {
    title: invitation.title || '',
    slug: invitation.slug || '',
    event_type: invitation.eventType || 'wedding',
    cover_image_url: invitation.coverImageUrl || '',
    music_url: invitation.musicUrl || '',
    youtube_url: invitation.youtubeUrl || '',
    story: invitation.story || '',
    seo_title: invitation.seoTitle || '',
    seo_description: invitation.seoDescription || '',
    og_image_url: invitation.ogImageUrl || '',
  };
};

const handleSave = async () => {
  localError.value = null;
  successMessage.value = null;

  if (!form.value.title.trim()) {
    localError.value = 'Title is required';
    return;
  }

  try {
    await invitationStore.updateInvitation(invitationId.value, {
      title: form.value.title,
      slug: form.value.slug,
      event_type: form.value.event_type,
      cover_image_url: form.value.cover_image_url || undefined,
      music_url: form.value.music_url || undefined,
      youtube_url: form.value.youtube_url || undefined,
      story: form.value.story || undefined,
      seo_title: form.value.seo_title || undefined,
      seo_description: form.value.seo_description || undefined,
      og_image_url: form.value.og_image_url || undefined,
    });
    successMessage.value = 'Invitation saved';
  } catch (err: any) {
    localError.value = err.message || 'Failed to save invitation';
  }
};

onMounted(loadInvitation);
</script>

<template>
  <main class="dashboard-shell">
    <aside class="dashboard-sidebar">
      <div class="brand">UndangAbi</div>
      <nav class="sidebar-nav" aria-label="Builder navigation">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          class="sidebar-link builder-tab"
          :class="{ 'is-active': activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </nav>
    </aside>

    <section class="dashboard-content">
      <header class="dashboard-header">
        <div>
          <p class="eyebrow">Invitation Builder</p>
          <h1>{{ invitationStore.currentInvitation?.title || 'Builder' }}</h1>
        </div>
        <div class="builder-actions">
          <Tag v-if="invitationStore.currentInvitation" :value="invitationStore.currentInvitation.status" />
          <button class="sidebar-toggle" type="button" @click="uiStore.toggleSidebar">
            {{ uiStore.isSidebarCollapsed ? 'Expand' : 'Collapse' }}
          </button>
        </div>
      </header>

      <section class="content-panel builder-panel">
        <div v-if="localError" class="error-alert">{{ localError }}</div>
        <div v-if="successMessage" class="success-alert">{{ successMessage }}</div>

        <GeneralBuilderSection v-if="activeTab === 'general'" v-model="form" />

        <CoverBuilderSection v-else-if="activeTab === 'cover'" v-model="form" />

        <MusicBuilderSection v-else-if="activeTab === 'music'" v-model="form" />

        <StoryBuilderSection v-else-if="activeTab === 'story'" v-model="form" />

        <SeoBuilderSection v-else-if="activeTab === 'seo'" v-model="form" />

        <div v-else class="builder-placeholder">
          <p class="eyebrow">{{ tabs.find((tab) => tab.key === activeTab)?.label }}</p>
          <h2>Coming next</h2>
          <p>This builder section will be implemented in upcoming tasks.</p>
        </div>

        <div class="builder-footer">
          <Button label="Save Changes" :loading="invitationStore.loading" @click="handleSave" />
        </div>
      </section>
    </section>
  </main>
</template>

<style scoped>
.builder-tab {
  width: 100%;
  border: 0;
  text-align: left;
}

.builder-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.builder-panel {
  display: grid;
  gap: 20px;
}

.builder-form {
  display: grid;
  max-width: 720px;
  gap: 18px;
}

.builder-placeholder {
  max-width: 640px;
}

.builder-footer {
  display: flex;
  justify-content: flex-start;
}

.success-alert {
  border: 1px solid #86efac;
  border-radius: 8px;
  background: #f0fdf4;
  color: #166534;
  padding: 12px 16px;
}
</style>
