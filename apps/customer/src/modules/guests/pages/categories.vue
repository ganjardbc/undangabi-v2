<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { Plus, Trash2 } from 'lucide-vue-next';
import { useGuestCategoryStore } from '../stores/guest-category.store';
import { useUiStore } from '../../../shared/stores/ui.store';

const route = useRoute();
const categoryStore = useGuestCategoryStore();
const uiStore = useUiStore();

const invitationId = computed(() => route.params.id as string);

const newCategoryName = ref('');
const newCategoryColor = ref('#3051B8');
const formError = ref<string | null>(null);

const handleCreate = async () => {
  formError.value = null;
  
  if (!newCategoryName.value.trim()) {
    formError.value = 'Category name is required';
    return;
  }

  try {
    await categoryStore.createCategory(invitationId.value, {
      name: newCategoryName.value.trim(),
      color: newCategoryColor.value,
    });
    newCategoryName.value = '';
    newCategoryColor.value = '#3051B8';
  } catch (err: any) {
    formError.value = err.message || 'Failed to create category';
  }
};

const handleDelete = async (id: string) => {
  if (!confirm('Are you sure you want to delete this category?')) return;
  await categoryStore.deleteCategory(invitationId.value, id);
};

onMounted(() => {
  categoryStore.fetchCategories(invitationId.value);
});
</script>

<template>
  <main class="dashboard-shell">
    <aside class="dashboard-sidebar">
      <div class="brand">UndangAbi</div>
      <nav class="sidebar-nav" aria-label="Customer navigation">
        <RouterLink class="sidebar-link" to="/dashboard">Dashboard</RouterLink>
        <RouterLink class="sidebar-link" to="/invitations">Invitations</RouterLink>
        <RouterLink class="sidebar-link" :to="`/invitations/${invitationId}/guests`">Guests</RouterLink>
        <RouterLink class="sidebar-link is-active" :to="`/invitations/${invitationId}/guest-categories`">Categories</RouterLink>
        <RouterLink class="sidebar-link" to="/analytics">Analytics</RouterLink>
        <RouterLink class="sidebar-link" to="/settings">Settings</RouterLink>
      </nav>
    </aside>

    <section class="dashboard-content">
      <header class="dashboard-header">
        <div>
          <p class="eyebrow">Guest Management</p>
          <h1>Categories</h1>
        </div>
        <button class="sidebar-toggle" type="button" @click="uiStore.toggleSidebar">
          {{ uiStore.isSidebarCollapsed ? 'Expand' : 'Collapse' }}
        </button>
      </header>

      <div class="content-grid">
        <section class="content-panel">
          <h2>Add New Category</h2>
          
          <div v-if="formError || categoryStore.error" class="error-alert">
            {{ formError || categoryStore.error }}
          </div>

          <form @submit.prevent="handleCreate" class="category-form">
            <div class="form-group">
              <label for="name">Name</label>
              <InputText id="name" v-model="newCategoryName" placeholder="e.g. VIP, Family" fluid />
            </div>

            <div class="form-group">
              <label for="color">Color Label (Hex)</label>
              <div class="flex items-center gap-2">
                <input id="color-picker" type="color" v-model="newCategoryColor" class="color-picker" />
                <InputText id="color-text" v-model="newCategoryColor" class="w-full" />
              </div>
            </div>

            <Button type="submit" label="Add Category" :loading="categoryStore.loading" class="mt-2">
              <template #icon>
                <Plus :size="16" class="mr-2" />
              </template>
            </Button>
          </form>
        </section>

        <section class="content-panel">
          <h2>Category List</h2>
          
          <DataTable
            :value="categoryStore.categories"
            :loading="categoryStore.loading"
            dataKey="id"
            class="p-datatable-sm"
          >
            <template #empty>No categories found.</template>

            <Column field="name" header="Name">
              <template #body="slotProps">
                <div class="flex items-center gap-2">
                  <span class="color-dot" :style="{ backgroundColor: slotProps.data.color || '#e5e7eb' }"></span>
                  <span class="font-medium">{{ slotProps.data.name }}</span>
                </div>
              </template>
            </Column>
            <Column field="createdAt" header="Created At">
              <template #body="slotProps">
                {{ new Date(slotProps.data.createdAt).toLocaleDateString() }}
              </template>
            </Column>
            <Column header="Actions" alignFrozen="right" frozen>
              <template #body="slotProps">
                <Button variant="text" severity="danger" rounded @click="handleDelete(slotProps.data.id)">
                  <template #icon>
                    <Trash2 :size="18" />
                  </template>
                </Button>
              </template>
            </Column>
          </DataTable>
        </section>
      </div>
    </section>
  </main>
</template>

<style scoped>
.flex { display: flex; }
.items-center { align-items: center; }
.gap-2 { gap: 0.5rem; }
.mr-2 { margin-right: 0.5rem; }
.mt-2 { margin-top: 0.5rem; }
.w-full { width: 100%; }
.font-medium { font-weight: 500; }

.content-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 24px;
  align-items: flex-start;
}

@media (max-width: 900px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

.category-form {
  display: grid;
  gap: 16px;
  margin-top: 16px;
}

.form-group {
  display: grid;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.color-picker {
  height: 40px;
  width: 50px;
  padding: 0;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
}

.color-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.error-alert {
  background-color: #fef2f2;
  border: 1px solid #fca5a5;
  border-radius: 8px;
  color: #b91c1c;
  font-size: 14px;
  padding: 12px 16px;
  margin-bottom: 16px;
}
</style>
