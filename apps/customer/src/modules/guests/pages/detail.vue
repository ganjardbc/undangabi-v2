<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import { ArrowLeft, User, Phone, Mail, Hash, Calendar, Send, ExternalLink, Link, QrCode } from 'lucide-vue-next';
import { useGuestStore } from '../stores/guest.store';

const route = useRoute();
const guestStore = useGuestStore();

const invitationId = computed(() => route.params.id as string);
const guestId = computed(() => route.params.guestId as string);
const guest = computed(() => guestStore.currentGuest);
const personalizedLink = ref('');
const qrData = ref<{ token: string, url: string } | null>(null);

const generateLink = async () => {
  const url = await guestStore.fetchGuestLink(invitationId.value, guestId.value);
  personalizedLink.value = url || '';
};

const generateQr = async () => {
  const data = await guestStore.fetchGuestQr(invitationId.value, guestId.value);
  if (data) {
    qrData.value = { token: data.qr_code_token, url: data.qr_code_url };
  }
};

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

onMounted(() => {
  guestStore.fetchGuest(invitationId.value, guestId.value);
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
        <div class="flex items-center gap-4">
          <RouterLink :to="`/invitations/${invitationId}/guests`">
            <Button variant="text" severity="secondary" rounded>
              <template #icon>
                <ArrowLeft :size="20" />
              </template>
            </Button>
          </RouterLink>
          <div>
            <p class="eyebrow">Guest Details</p>
            <h1>{{ guest?.name || 'Guest' }}</h1>
          </div>
        </div>
      </header>

      <section v-if="guestStore.loading" class="content-panel">
        <p>Loading guest data...</p>
      </section>

      <section v-else-if="guest" class="detail-grid">
        <div class="content-panel">
          <div class="section-header">
            <User :size="20" class="text-blue-600" />
            <h2>Personal Information</h2>
          </div>
          <div class="info-list">
            <div class="info-item">
              <span class="label">Full Name</span>
              <span class="value">{{ guest.name }}</span>
            </div>
            <div class="info-item">
              <span class="label">Phone Number</span>
              <div class="flex items-center gap-2">
                <Phone :size="14" class="text-gray-400" />
                <span class="value">{{ guest.phone || '-' }}</span>
              </div>
            </div>
            <div class="info-item">
              <span class="label">Email Address</span>
              <div class="flex items-center gap-2">
                <Mail :size="14" class="text-gray-400" />
                <span class="value">{{ guest.email || '-' }}</span>
              </div>
            </div>
            <div class="info-item">
              <span class="label">Category</span>
              <Tag :value="guest.category?.name || 'Uncategorized'" severity="secondary" />
            </div>
          </div>
        </div>

        <div class="content-panel">
          <div class="section-header">
            <Send :size="20" class="text-blue-600" />
            <h2>Invitation Status</h2>
          </div>
          <div class="info-list">
            <div class="info-item">
              <span class="label">Current Status</span>
              <Tag :value="guest.status" :severity="getStatusSeverity(guest.status)" />
            </div>
            <div class="info-item">
              <span class="label">Max Guests</span>
              <span class="value">{{ guest.maxGuestCount }} people</span>
            </div>
            <div class="info-item">
              <span class="label">Sent At</span>
              <div class="flex items-center gap-2">
                <Calendar :size="14" class="text-gray-400" />
                <span class="value">{{ guest.sentAt ? new Date(guest.sentAt).toLocaleString() : '-' }}</span>
              </div>
            </div>
            <div class="info-item">
              <span class="label">Opened At</span>
              <div class="flex items-center gap-2">
                <Calendar :size="14" class="text-gray-400" />
                <span class="value">{{ guest.openedAt ? new Date(guest.openedAt).toLocaleString() : '-' }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="content-panel full-width">
          <div class="section-header">
            <Link :size="20" class="text-blue-600" />
            <h2>Personalized Link</h2>
          </div>
          <div class="link-actions">
            <Button label="Generate Link" :loading="guestStore.loading" @click="generateLink" />
            <a v-if="personalizedLink" :href="personalizedLink" target="_blank" rel="noreferrer">
              <Button label="Open Link" severity="secondary">
                <template #icon>
                  <ExternalLink :size="16" class="mr-2" />
                </template>
              </Button>
            </a>
          </div>
          <div v-if="personalizedLink" class="token-box link-box">
            <code>{{ personalizedLink }}</code>
          </div>
        </div>

        <div class="content-panel full-width">
          <div class="section-header">
            <QrCode :size="20" class="text-blue-600" />
            <h2>Check-In QR Code</h2>
          </div>
          <div class="link-actions">
            <Button label="Generate QR" :loading="guestStore.loading" @click="generateQr" />
          </div>
          <div v-if="qrData" class="token-box link-box">
            <p class="label">Check-In URL (Encoded in QR):</p>
            <code>{{ qrData.url }}</code>
            <p class="label" style="margin-top:12px;">Token:</p>
            <code>{{ qrData.token }}</code>
          </div>
        </div>

        <div class="content-panel full-width">
          <div class="section-header">
            <Hash :size="20" class="text-blue-600" />
            <h2>Access Tokens</h2>
          </div>
          <div class="tokens-grid">
            <div class="token-box">
              <span class="label">Invitation Token</span>
              <code>{{ guest.invitationToken }}</code>
            </div>
            <div class="token-box">
              <span class="label">QR Code Token</span>
              <code>{{ guest.qrCodeToken }}</code>
            </div>
          </div>
        </div>
      </section>

      <section v-else class="content-panel">
        <p>Guest not found.</p>
      </section>
    </section>
  </main>
</template>

<style scoped>
.flex { display: flex; }
.items-center { align-items: center; }
.gap-2 { gap: 0.5rem; }
.gap-4 { gap: 1rem; }
.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 24px;
  margin-top: 24px;
}
.full-width {
  grid-column: 1 / -1;
}
.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f3f4f6;
}
.section-header h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
}
.info-list {
  display: grid;
  gap: 16px;
}
.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.label {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}
.value {
  font-size: 15px;
  color: #111827;
  font-weight: 500;
}
.text-blue-600 { color: #2563eb; }
.text-gray-400 { color: #9ca3af; }
.tokens-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
.link-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}
.link-box {
  background: #eff6ff;
  border-color: #bfdbfe;
}
.token-box {
  background: #f9fafb;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  padding: 12px 16px;
}
.token-box code {
  display: block;
  margin-top: 8px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
  color: #374151;
  word-break: break-all;
}
</style>
