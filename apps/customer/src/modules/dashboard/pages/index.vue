<script setup lang="ts">
import { useUiStore } from '../../../shared/stores/ui.store';

const uiStore = useUiStore();
</script>

<template>
  <main class="dashboard-shell">
    <aside class="dashboard-sidebar">
      <div class="brand">UndangAbi</div>
      <nav class="sidebar-nav" aria-label="Customer navigation">
        <a class="sidebar-link is-active" href="/dashboard">Dashboard</a>
        <a class="sidebar-link" href="/invitations">Invitations</a>
        <a class="sidebar-link" href="/guests">Guests</a>
        <a class="sidebar-link" href="/analytics">Analytics</a>
        <a class="sidebar-link" href="/settings">Settings</a>
      </nav>
    </aside>

    <section class="dashboard-content">
      <header class="dashboard-header">
        <div>
          <p class="eyebrow">Customer Dashboard</p>
          <h1>Dashboard</h1>
        </div>
        <button class="sidebar-toggle" type="button" @click="uiStore.toggleSidebar">
          {{ uiStore.isSidebarCollapsed ? 'Expand' : 'Collapse' }}
        </button>
      </header>

      <section class="content-panel" aria-labelledby="dashboard-summary-title">
        <p class="eyebrow">Foundation</p>
        <h2 id="dashboard-summary-title">Customer app is running</h2>
        <p>
          Vue, Vite, Pinia, and Vue Router are configured for the customer dashboard.
        </p>
      </section>
    </section>
  </main>
</template>
