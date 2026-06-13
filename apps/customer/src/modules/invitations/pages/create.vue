<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useInvitationStore } from '../stores/invitation.store';
import { useUiStore } from '../../../shared/stores/ui.store';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Button from 'primevue/button';

const router = useRouter();
const invitationStore = useInvitationStore();
const uiStore = useUiStore();

const title = ref('');
const slug = ref('');
const eventType = ref('wedding');
const themeId = ref('');
const localError = ref<string | null>(null);

const eventTypes = [
  { label: 'Wedding', value: 'wedding' },
  { label: 'Khitanan', value: 'khitanan' },
  { label: 'Birthday', value: 'birthday' },
  { label: 'Graduation', value: 'graduation' },
  { label: 'Seminar', value: 'seminar' },
  { label: 'Gathering', value: 'gathering' },
  { label: 'Custom', value: 'custom' },
];

const handleSubmit = async () => {
  localError.value = null;

  if (!title.value.trim()) {
    localError.value = 'Title is required';
    return;
  }

  try {
    await invitationStore.createInvitation({
      title: title.value.trim(),
      slug: slug.value.trim() || undefined,
      event_type: eventType.value as any,
      theme_id: themeId.value || undefined,
    });
    router.push('/invitations');
  } catch (err: any) {
    localError.value = err.message || 'Failed to create invitation';
  }
};
</script>

<template>
  <main class="dashboard-shell">
    <aside class="dashboard-sidebar">
      <div class="brand">UndangAbi</div>
      <nav class="sidebar-nav" aria-label="Customer navigation">
        <RouterLink class="sidebar-link" to="/dashboard">Dashboard</RouterLink>
        <RouterLink class="sidebar-link" to="/invitations">Invitations</RouterLink>
        <RouterLink class="sidebar-link" to="/guests">Guests</RouterLink>
        <RouterLink class="sidebar-link" to="/analytics">Analytics</RouterLink>
        <RouterLink class="sidebar-link" to="/settings">Settings</RouterLink>
      </nav>
    </aside>

    <section class="dashboard-content">
      <header class="dashboard-header">
        <div>
          <p class="eyebrow">Invitation Core</p>
          <h1>Create Invitation</h1>
        </div>
        <button class="sidebar-toggle" type="button" @click="uiStore.toggleSidebar">
          {{ uiStore.isSidebarCollapsed ? 'Expand' : 'Collapse' }}
        </button>
      </header>

      <section class="content-panel">
        <div v-if="localError" class="error-alert">
          {{ localError }}
        </div>

        <form @submit.prevent="handleSubmit" class="auth-form" novalidate>
          <div class="form-group">
            <label for="title">Title <span class="text-red-500">*</span></label>
            <InputText id="title" v-model="title" placeholder="Wedding Ganjar & Fitri" fluid />
          </div>

          <div class="form-group">
            <label for="slug">Slug</label>
            <InputText id="slug" v-model="slug" placeholder="ganjar-fitri (auto-generated if empty)" fluid />
          </div>

          <div class="form-group">
            <label for="event_type">Event Type</label>
            <Select id="event_type" v-model="eventType" :options="eventTypes" optionLabel="label" optionValue="value" fluid />
          </div>

          <div class="form-group">
            <label for="theme_id">Theme ID</label>
            <InputText id="theme_id" v-model="themeId" placeholder="Optional" fluid />
          </div>

          <Button type="submit" label="Create Invitation" :loading="invitationStore.loading" />
        </form>
      </section>
    </section>
  </main>
</template>

<style scoped>
.text-red-500 { color: #ef4444; }
</style>
