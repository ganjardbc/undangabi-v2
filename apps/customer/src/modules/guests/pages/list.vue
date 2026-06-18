<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Tag from 'primevue/tag';
import { Plus, Search, MoreHorizontal, Upload } from 'lucide-vue-next';
import { useGuestStore } from '../stores/guest.store';
import { useUiStore } from '../../../shared/stores/ui.store';

const route = useRoute();
const guestStore = useGuestStore();
const uiStore = useUiStore();
const searchQuery = ref('');
const statusFilter = ref('');

const invitationId = computed(() => route.params.id as string);

const statusOptions = [
  { label: 'All Status', value: '' },
  { label: 'Not Sent', value: 'not_sent' },
  { label: 'Sent', value: 'sent' },
  { label: 'Opened', value: 'opened' },
  { label: 'RSVP Submitted', value: 'rsvp_submitted' },
  { label: 'Checked In', value: 'checked_in' },
];

const getStatusSeverity = (status: string) => {
  switch (status) {
    case 'checked_in':
      return 'success';
    case 'rsvp_submitted':
      return 'info';
    case 'opened':
      return 'warn';
    case 'sent':
      return 'secondary';
    default:
      return 'contrast';
  }
};

const fetchGuests = (page = 1) => {
  guestStore.fetchGuests(invitationId.value, {
    page,
    search: searchQuery.value,
    status: statusFilter.value,
  });
};

const onSearch = () => {
  fetchGuests(1);
};

const onStatusChange = () => {
  fetchGuests(1);
};

onMounted(() => {
  fetchGuests();
});
</script>

<template>
  <main class="dashboard-shell">
    <aside class="dashboard-sidebar">
      <div class="brand">UndangAbi</div>
      <nav class="sidebar-nav" aria-label="Customer navigation">
        <RouterLink class="sidebar-link" to="/dashboard">Dashboard</RouterLink>
        <RouterLink class="sidebar-link" to="/invitations">Invitations</RouterLink>
        <RouterLink class="sidebar-link is-active" :to="`/invitations/${invitationId}/guests`">Guests</RouterLink>
        <RouterLink class="sidebar-link" to="/analytics">Analytics</RouterLink>
        <RouterLink class="sidebar-link" to="/settings">Settings</RouterLink>
      </nav>
    </aside>

    <section class="dashboard-content">
      <header class="dashboard-header">
        <div>
          <p class="eyebrow">Guest Management</p>
          <h1>Guests</h1>
        </div>
        <div class="flex items-center gap-3">
          <RouterLink :to="`/invitations/${invitationId}/guests/import`">
            <Button label="Import CSV" size="small">
              <template #icon>
                <Upload :size="16" class="mr-2" />
              </template>
            </Button>
          </RouterLink>
          <RouterLink :to="`/invitations/${invitationId}/guest-categories`">
            <Button label="Categories" size="small" severity="secondary" />
          </RouterLink>
          <button class="sidebar-toggle" type="button" @click="uiStore.toggleSidebar">
            {{ uiStore.isSidebarCollapsed ? 'Expand' : 'Collapse' }}
          </button>
        </div>
      </header>

      <div class="content-panel">
        <div class="toolbar">
          <div class="relative w-full max-w-sm">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Search :size="18" />
            </span>
            <InputText
              v-model="searchQuery"
              placeholder="Search name, phone, email..."
              class="pl-10 w-full"
              @input="onSearch"
            />
          </div>

          <Select
            v-model="statusFilter"
            :options="statusOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Status"
            class="status-filter"
            @change="onStatusChange"
          />
        </div>

        <DataTable
          :value="guestStore.guests"
          :loading="guestStore.loading"
          dataKey="id"
          :rows="10"
          lazy
          :totalRecords="guestStore.meta.total"
          @page="e => fetchGuests(e.page + 1)"
          class="p-datatable-sm"
        >
          <template #empty>No guests found.</template>
          <template #loading>Loading guests. Please wait.</template>

          <Column field="name" header="Name" sortable></Column>
          <Column field="phone" header="Phone"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="status" header="Status">
            <template #body="slotProps">
              <Tag :value="slotProps.data.status" :severity="getStatusSeverity(slotProps.data.status)" />
            </template>
          </Column>
          <Column field="category.name" header="Category">
            <template #body="slotProps">
              {{ slotProps.data.category?.name || '-' }}
            </template>
          </Column>
          <Column field="maxGuestCount" header="Max Guests"></Column>
          <Column field="createdAt" header="Created At">
            <template #body="slotProps">
              {{ new Date(slotProps.data.createdAt).toLocaleDateString() }}
            </template>
          </Column>
          <Column header="Actions" alignFrozen="right" frozen>
            <template #body="slotProps">
              <RouterLink :to="`/invitations/${invitationId}/guests/${slotProps.data.id}`">
                <Button variant="text" severity="secondary" rounded>
                  <template #icon>
                    <MoreHorizontal :size="18" />
                  </template>
                </Button>
              </RouterLink>
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
.gap-3 { gap: 0.75rem; }
.mr-2 { margin-right: 0.5rem; }
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
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}
.status-filter { min-width: 180px; }
@media (max-width: 760px) {
  .toolbar {
    align-items: stretch;
    flex-direction: column;
  }
  .status-filter {
    width: 100%;
  }
}
</style>
