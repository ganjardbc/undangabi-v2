<script setup lang="ts">
import { useUiStore } from '../../../shared/stores/ui.store';

const uiStore = useUiStore();
</script>

<template>
  <main class="admin-shell">
    <aside class="admin-sidebar">
      <div class="brand-row">
        <div class="brand">UndangAbi</div>
        <span class="admin-badge">Admin</span>
      </div>
      <nav class="sidebar-nav" aria-label="Admin navigation">
        <a class="sidebar-link is-active" href="/admin/dashboard">Dashboard</a>
        <a class="sidebar-link" href="/admin/users">Users</a>
        <a class="sidebar-link" href="/admin/invitations">Invitations</a>
        <a class="sidebar-link" href="/admin/templates">Templates</a>
        <a class="sidebar-link" href="/admin/analytics">Analytics</a>
        <a class="sidebar-link" href="/admin/settings/profile">Settings</a>
      </nav>
    </aside>

    <section class="admin-content">
      <header class="admin-header">
        <div>
          <p class="eyebrow">Admin Panel</p>
          <h1>Admin Dashboard</h1>
        </div>
        <button class="sidebar-toggle" type="button" @click="uiStore.toggleSidebar">
          {{ uiStore.isSidebarCollapsed ? 'Expand' : 'Collapse' }}
        </button>
      </header>

      <section class="content-panel" aria-labelledby="admin-summary-title">
        <p class="eyebrow">Foundation</p>
        <h2 id="admin-summary-title">Admin app is running</h2>
        <p>
          Vue, Vite, Pinia, and Vue Router are configured for the admin dashboard.
        </p>
      </section>
    </section>
  </main>
</template>
