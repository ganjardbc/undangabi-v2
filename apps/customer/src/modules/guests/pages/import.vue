<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Button from 'primevue/button';
import { ArrowLeft, Upload, FileText, CheckCircle, AlertCircle } from 'lucide-vue-next';
import { useGuestStore } from '../stores/guest.store';

const route = useRoute();
const router = useRouter();
const guestStore = useGuestStore();

const invitationId = computed(() => route.params.id as string);
const selectedFile = ref<File | null>(null);
const importResult = ref<{ imported: number } | null>(null);
const uploadError = ref<string | null>(null);

const handleFileChange = (event: Event) => {
  uploadError.value = null;
  importResult.value = null;
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    selectedFile.value = input.files[0] || null;
  }
};

const handleUpload = async () => {
  if (!selectedFile.value) {
    uploadError.value = 'Please select a CSV file';
    return;
  }

  uploadError.value = null;
  importResult.value = null;

  try {
    const result = await guestStore.importCsv(invitationId.value, selectedFile.value);
    importResult.value = result;
    selectedFile.value = null;
  } catch (err: any) {
    uploadError.value = err.message || 'Import failed';
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
        <RouterLink class="sidebar-link is-active" :to="`/invitations/${invitationId}/guests`">Guests</RouterLink>
        <RouterLink class="sidebar-link" :to="`/invitations/${invitationId}/guest-categories`">Categories</RouterLink>
        <RouterLink class="sidebar-link" to="/analytics">Analytics</RouterLink>
        <RouterLink class="sidebar-link" to="/settings">Settings</RouterLink>
      </nav>
    </aside>

    <section class="dashboard-content">
      <header class="dashboard-header">
        <div class="flex items-center gap-4">
          <RouterLink :to="`/invitations/${invitationId}/guests`">
            <Button variant="text" severity="secondary" rounded>
              <template #icon>
                <ArrowLeft :size="20" />
              </template>
            </Button>
          </RouterLink>
          <div>
            <p class="eyebrow">Guest Management</p>
            <h1>Import Guests from CSV</h1>
          </div>
        </div>
      </header>

      <div class="import-layout">
        <section class="content-panel">
          <div class="section-header">
            <Upload :size="20" class="text-blue-600" />
            <h2>Upload CSV File</h2>
          </div>

          <div v-if="uploadError" class="error-alert">
            <AlertCircle :size="16" />
            <span>{{ uploadError }}</span>
          </div>

          <div v-if="importResult" class="success-alert">
            <CheckCircle :size="16" />
            <span>{{ importResult.imported }} guests imported successfully.</span>
          </div>

          <div class="upload-area">
            <input
              type="file"
              accept=".csv"
              @change="handleFileChange"
              class="file-input"
              id="csv-upload"
            />
            <label for="csv-upload" class="file-label">
              <FileText :size="32" class="file-icon" />
              <p v-if="!selectedFile">Click to select a CSV file</p>
              <p v-else class="file-name">{{ selectedFile.name }} ({{ (selectedFile.size / 1024).toFixed(1) }} KB)</p>
            </label>
          </div>

          <Button
            label="Import Guests"
            :loading="guestStore.loading"
            :disabled="!selectedFile"
            class="mt-3"
            @click="handleUpload"
          />

          <Button
            label="View Guests"
            severity="secondary"
            variant="outlined"
            class="mt-2 ml-2"
            @click="router.push(`/invitations/${invitationId}/guests`)"
          />
        </section>

        <section class="content-panel">
          <h2>CSV Format Instructions</h2>
          <div class="instructions">
            <p>Your CSV file should include a header row with the following columns:</p>
            <pre class="csv-sample">name,phone,email,category,max_guest_count
Ganjar Hadiatna,08123456789,ganjar@mail.com,Family,2
Fitri Nurhayati,087654321,,Family,1</pre>
            <ul>
              <li><strong>name</strong> <span class="required">*required</span> — Guest full name</li>
              <li><strong>phone</strong> — Phone number</li>
              <li><strong>email</strong> — Email address</li>
              <li><strong>category</strong> — Category name (created automatically if missing)</li>
              <li><strong>max_guest_count</strong> — Maximum guest count (default: 1)</li>
            </ul>
            <p class="note">Only the <strong>name</strong> column is required. All guest tokens and QR codes are generated automatically.</p>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<style scoped>
.flex { display: flex; }
.items-center { align-items: center; }
.gap-4 { gap: 1rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-3 { margin-top: 0.75rem; }
.ml-2 { margin-left: 0.5rem; }

.import-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;
  align-items: flex-start;
  margin-top: 24px;
}

@media (max-width: 900px) {
  .import-layout {
    grid-template-columns: 1fr;
  }
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.section-header h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
}

.text-blue-600 { color: #2563eb; }

.upload-area {
  border: 2px dashed #e5e7eb;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  margin-bottom: 20px;
  transition: border-color 0.2s;
}

.upload-area:hover {
  border-color: #93c5fd;
}

.file-input {
  display: none;
}

.file-label {
  display: block;
  cursor: pointer;
}

.file-icon {
  margin: 0 auto 12px;
  color: #9ca3af;
}

.file-name {
  font-weight: 600;
  color: #111827;
}

.label-text {
  color: #6b7280;
  font-size: 14px;
}

.error-alert {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fef2f2;
  border: 1px solid #fca5a5;
  border-radius: 8px;
  color: #b91c1c;
  font-size: 14px;
  padding: 12px 16px;
  margin-bottom: 16px;
}

.success-alert {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: 8px;
  color: #166534;
  font-size: 14px;
  padding: 12px 16px;
  margin-bottom: 16px;
}

.instructions {
  font-size: 14px;
  line-height: 1.6;
  color: #374151;
}

.instructions ul {
  padding-left: 16px;
}

.instructions li {
  margin-bottom: 8px;
}

.required {
  display: inline-block;
  border-radius: 4px;
  background: #fef2f2;
  color: #b91c1c;
  font-size: 11px;
  font-weight: 700;
  padding: 1px 6px;
  vertical-align: middle;
}

.csv-sample {
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #f9fafb;
  padding: 12px 16px;
  font-family: ui-monospace, monospace;
  font-size: 13px;
  overflow-x: auto;
  white-space: pre;
  color: #374151;
}

.note {
  margin-top: 16px;
  border-radius: 8px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 12px 16px;
  font-size: 13px;
  color: #1e40af;
}
</style>
