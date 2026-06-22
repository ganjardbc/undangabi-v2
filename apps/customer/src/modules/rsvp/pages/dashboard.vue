<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Select from 'primevue/select';
import Tag from 'primevue/tag';
import { Search } from 'lucide-vue-next';
import { useRsvpStore } from '../stores/rsvp.store';
import { useUiStore } from '../../../shared/stores/ui.store';

const route = useRoute();
const rsvpStore = useRsvpStore();
const uiStore = useUiStore();
const statusFilter = ref('');

const invitationId = computed(() => route.params.id as string);

const statusOptions = [
  { label: 'All Status', value: '' },
  { label: 'Attending', value: 'attending' },
  { label: 'Not Attending', value: 'not_attending' },
];

const getStatusSeverity = (status: string) => {
  switch (status) {
    case 'attending':
      return 'success';
    case 'not_attending':
      return 'danger';
    default:
      return 'info';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'attending':
      return 'Attending';
    case 'not_attending':
      return 'Not Attending';
    default:
      return status;
  }
};

const fetchRsvps = (page = 1) => {
  rsvpStore.fetchRsvps(invitationId.value, {
    page,
    attendance_status: statusFilter.value || undefined,
  });
};

const onStatusChange = () => {
  fetchRsvps(1);
};

onMounted(() => {
  fetchRsvps();
  rsvpStore.fetchSummary(invitationId.value);
});
</script>

<template>
  <main class="dashboard-shell">
    <aside class="dashboard-sidebar">
      <div class="brand">UndangAbi</div>
      <nav class="sidebar-nav" aria-label="Customer navigation">
        <RouterLink class="sidebar-link" to="/dashboard">Dashboard</RouterLink>
        <RouterLink class="sidebar-link" to="/invitations">Invitations</RouterLink>
        <RouterLink class="sidebar-link is-active" :to="`/invitations/${invitationId}/rsvp`">RSVP</RouterLink>
        <RouterLink class="sidebar-link" :to="`/invitations/${invitationId}/guests`">Guests</RouterLink>
        <RouterLink class="sidebar-link" to="/analytics">Analytics</RouterLink>
        <RouterLink class="sidebar-link" to="/settings">Settings</RouterLink>
      </nav>
    </aside>

    <section class="dashboard-content">
      <header class="dashboard-header">
        <div>
          <p class="eyebrow">RSVP & Guestbook</p>
          <h1>RSVP Dashboard</h1>
        </div>
        <div class="flex items-center gap-3">
          <button class="sidebar-toggle" type="button" @click="uiStore.toggleSidebar">
            {{ uiStore.isSidebarCollapsed ? 'Expand' : 'Collapse' }}
          </button>
        </div>
      </header>

      <div class="content-panel">
        <!-- Summary Cards -->
        <div class="summary-grid">
          <div class="summary-card">
            <p class="summary-label">Total Guests</p>
            <p class="summary-value">{{ rsvpStore.summary?.total ?? 0 }}</p>
          </div>
          <div class="summary-card summary-card--success">
            <p class="summary-label">Attending</p>
            <p class="summary-value">{{ rsvpStore.summary?.attending ?? 0 }}</p>
          </div>
          <div class="summary-card summary-card--danger">
            <p class="summary-label">Not Attending</p>
            <p class="summary-value">{{ rsvpStore.summary?.not_attending ?? 0 }}</p>
          </div>
          <div class="summary-card summary-card--warn">
            <p class="summary-label">Not Responded</p>
            <p class="summary-value">{{ rsvpStore.summary?.not_responded ?? 0 }}</p>
          </div>
        </div>

        <!-- Filter -->
        <div class="toolbar">
          <div class="relative w-full max-w-sm">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Search :size="18" />
            </span>
            <span class="pl-10 text-sm text-gray-500">Search by guest name (coming soon)</span>
          </div>

          <Select
            v-model="statusFilter"
            :options="statusOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Filter by status"
            class="status-filter"
            @change="onStatusChange"
          />
        </div>

        <!-- RSVP Table -->
        <DataTable
          :value="rsvpStore.rsvps"
          :loading="rsvpStore.loading"
          dataKey="id"
          :rows="10"
          lazy
          :totalRecords="rsvpStore.meta.total"
          @page="e => fetchRsvps(e.page + 1)"
          class="p-datatable-sm"
        >
          <template #empty>No RSVP responses found.</template>
          <template #loading>Loading RSVP data. Please wait.</template>

          <Column field="guest.name" header="Guest Name" sortable></Column>
          <Column field="guest.email" header="Email"></Column>
          <Column field="guest.phone" header="Phone"></Column>
          <Column field="attendanceStatus" header="Status">
            <template #body="slotProps">
              <Tag
                :value="getStatusLabel(slotProps.data.attendanceStatus)"
                :severity="getStatusSeverity(slotProps.data.attendanceStatus)"
              />
            </template>
          </Column>
          <Column field="guestCount" header="Guest Count"></Column>
          <Column field="message" header="Message"></Column>
          <Column field="submittedAt" header="Submitted At">
            <template #body="slotProps">
              {{ new Date(slotProps.data.submittedAt).toLocaleString() }}
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
.text-gray-500 { color: #6b7280; }
.text-sm { font-size: 0.875rem; }

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.summary-card {
  background: var(--surface-card, #fff);
  border: 1px solid var(--surface-border, #e5e7eb);
  border-radius: 8px;
  padding: 1.25rem;
  transition: box-shadow 0.2s;
}

.summary-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.summary-card--success {
  border-left: 4px solid #22c55e;
}

.summary-card--danger {
  border-left: 4px solid #ef4444;
}

.summary-card--warn {
  border-left: 4px solid #f59e0b;
}

.summary-label {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
}

.summary-value {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: #111827;
}

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
