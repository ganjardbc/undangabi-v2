<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useInvitationStore } from '../stores/invitation.store';
import { useUiStore } from '../../../shared/stores/ui.store';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Tag from 'primevue/tag';
import { Plus, Search, MoreHorizontal } from 'lucide-vue-next';

const invitationStore = useInvitationStore();
const uiStore = useUiStore();
const searchQuery = ref('');

const getStatusSeverity = (status: string) => {
  switch (status) {
    case 'published':
      return 'success';
    case 'draft':
      return 'secondary';
    case 'archived':
      return 'danger';
    default:
      return 'info';
  }
};

const onSearch = () => {
  invitationStore.fetchInvitations({ search: searchQuery.value });
};

onMounted(() => {
  invitationStore.fetchInvitations();
});
</script>

<template>
  <main class="dashboard-shell">
    <aside class="dashboard-sidebar">
      <div class="brand">UndangAbi</div>
      <nav class="sidebar-nav" aria-label="Customer navigation">
        <RouterLink class="sidebar-link" to="/dashboard">Dashboard</RouterLink>
        <RouterLink class="sidebar-link is-active" to="/invitations">Invitations</RouterLink>
        <RouterLink class="sidebar-link" to="/guests">Guests</RouterLink>
        <RouterLink class="sidebar-link" to="/analytics">Analytics</RouterLink>
        <RouterLink class="sidebar-link" to="/settings">Settings</RouterLink>
      </nav>
    </aside>

    <section class="dashboard-content">
      <header class="dashboard-header">
        <div>
          <p class="eyebrow">Invitation Core</p>
          <h1>Invitations</h1>
        </div>
        <div class="flex items-center gap-3">
          <RouterLink to="/invitations/create">
            <Button label="Create New" size="small">
              <template #icon>
                <Plus :size="16" class="mr-2" />
              </template>
            </Button>
          </RouterLink>
          <button class="sidebar-toggle" type="button" @click="uiStore.toggleSidebar">
            {{ uiStore.isSidebarCollapsed ? 'Expand' : 'Collapse' }}
          </button>
        </div>
      </header>

      <div class="content-panel">
        <div class="flex justify-between items-center mb-6">
          <div class="relative w-full max-w-sm">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Search :size="18" />
            </span>
            <InputText 
              v-model="searchQuery" 
              placeholder="Search invitations..." 
              class="pl-10 w-full" 
              @input="onSearch"
            />
          </div>
        </div>

        <DataTable 
          :value="invitationStore.invitations" 
          :loading="invitationStore.loading"
          dataKey="id"
          :rows="10"
          lazy
          :totalRecords="invitationStore.meta.total"
          @page="e => invitationStore.fetchInvitations({ page: e.page + 1 })"
          class="p-datatable-sm"
        >
          <template #empty> No invitations found. </template>
          <template #loading> Loading invitations data. Please wait. </template>
          
          <Column field="title" header="Title" sortable></Column>
          <Column field="slug" header="Slug"></Column>
          <Column field="eventType" header="Event Type">
            <template #body="slotProps">
              <span class="capitalize">{{ slotProps.data.eventType }}</span>
            </template>
          </Column>
          <Column field="status" header="Status">
            <template #body="slotProps">
              <Tag :value="slotProps.data.status" :severity="getStatusSeverity(slotProps.data.status)" />
            </template>
          </Column>
          <Column field="createdAt" header="Created At">
            <template #body="slotProps">
              {{ new Date(slotProps.data.createdAt).toLocaleDateString() }}
            </template>
          </Column>
          <Column header="Actions" alignFrozen="right" frozen>
            <template #body>
              <Button variant="text" severity="secondary" rounded>
                <template #icon>
                  <MoreHorizontal :size="18" />
                </template>
              </Button>
            </template>
          </Column>
        </DataTable>
      </div>
    </section>
  </main>
</template>

<style scoped>
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-3 { gap: 0.75rem; }
.mb-6 { margin-bottom: 1.5rem; }
.relative { position: relative; }
.absolute { position: absolute; }
.inset-y-0 { top: 0; bottom: 0; }
.left-0 { left: 0; }
.pl-3 { padding-left: 0.75rem; }
.pl-10 { padding-left: 2.5rem; }
.w-full { width: 100%; }
.max-w-sm { max-width: 24rem; }
.pointer-events-none { pointer-events: none; }
.text-gray-400 { color: #9ca3af; }
.capitalize { text-transform: capitalize; }
</style>
