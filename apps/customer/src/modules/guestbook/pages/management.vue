<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import { Trash2 } from 'lucide-vue-next';
import { useGuestbookStore } from '../stores/guestbook.store';
import { useUiStore } from '../../../shared/stores/ui.store';

const route = useRoute();
const guestbookStore = useGuestbookStore();
const uiStore = useUiStore();

const invitationId = computed(() => route.params.id as string);

const fetchEntries = (page = 1) => {
  guestbookStore.fetchEntries(invitationId.value, { page });
};

const onDelete = async (entryId: string) => {
  if (confirm('Are you sure you want to delete this guestbook entry?')) {
    try {
      await guestbookStore.deleteEntry(invitationId.value, entryId);
    } catch (err) {
      console.error(err);
    }
  }
};

onMounted(() => {
  fetchEntries();
});
</script>

<template>
  <main class="dashboard-shell">
    <aside class="dashboard-sidebar">
      <div class="brand">UndangAbi</div>
      <nav class="sidebar-nav" aria-label="Customer navigation">
        <RouterLink class="sidebar-link" to="/dashboard">Dashboard</RouterLink>
        <RouterLink class="sidebar-link" to="/invitations">Invitations</RouterLink>
        <RouterLink class="sidebar-link" :to="`/invitations/${invitationId}/rsvp`">RSVP</RouterLink>
        <RouterLink class="sidebar-link is-active" :to="`/invitations/${invitationId}/guestbook`">Guestbook</RouterLink>
        <RouterLink class="sidebar-link" :to="`/invitations/${invitationId}/guests`">Guests</RouterLink>
        <RouterLink class="sidebar-link" to="/analytics">Analytics</RouterLink>
        <RouterLink class="sidebar-link" to="/settings">Settings</RouterLink>
      </nav>
    </aside>

    <section class="dashboard-content">
      <header class="dashboard-header">
        <div>
          <p class="eyebrow">RSVP & Guestbook</p>
          <h1>Guestbook Management</h1>
        </div>
        <div class="flex items-center gap-3">
          <button class="sidebar-toggle" type="button" @click="uiStore.toggleSidebar">
            {{ uiStore.isSidebarCollapsed ? 'Expand' : 'Collapse' }}
          </button>
        </div>
      </header>

      <div class="content-panel">
        <!-- Summary Card -->
        <div class="summary-card">
          <p class="summary-label">Total Messages</p>
          <p class="summary-value">{{ guestbookStore.meta.total }}</p>
        </div>

        <!-- Guestbook Table -->
        <DataTable
          :value="guestbookStore.entries"
          :loading="guestbookStore.loading"
          dataKey="id"
          :rows="10"
          lazy
          :totalRecords="guestbookStore.meta.total"
          @page="e => fetchEntries(e.page + 1)"
          class="p-datatable-sm"
        >
          <template #empty>No guestbook entries found.</template>
          <template #loading>Loading guestbook data. Please wait.</template>

          <Column field="senderName" header="Sender" sortable></Column>
          <Column field="message" header="Message">
            <template #body="slotProps">
              <div class="message-cell">{{ slotProps.data.message }}</div>
            </template>
          </Column>
          <Column field="createdAt" header="Date">
            <template #body="slotProps">
              {{ new Date(slotProps.data.createdAt).toLocaleString() }}
            </template>
          </Column>
          <Column header="Actions" style="width: 100px">
            <template #body="slotProps">
              <Button
                icon="pi pi-trash"
                severity="danger"
                text
                rounded
                @click="onDelete(slotProps.data.id)"
              >
                <template #icon>
                  <Trash2 :size="18" />
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
.gap-3 { gap: 0.75rem; }

.summary-card {
  background: var(--surface-card, #fff);
  border: 1px solid var(--surface-border, #e5e7eb);
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 2rem;
  transition: box-shadow 0.2s;
}

.summary-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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

.message-cell {
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 760px) {
  .message-cell {
    max-width: 200px;
  }
}
</style>
