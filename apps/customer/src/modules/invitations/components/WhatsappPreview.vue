<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  imageUrl: string;
  domain?: string;
}>();
</script>

<template>
  <section class="whatsapp-preview" aria-label="WhatsApp preview">
    <div class="chat-bubble">
      <div class="link-preview">
        <div v-if="imageUrl" class="preview-image-wrap">
          <img :src="imageUrl" alt="WhatsApp OG preview" class="preview-image" />
        </div>
        <div class="preview-content">
          <p class="preview-title">{{ title || 'Invitation Title' }}</p>
          <p class="preview-description">{{ description || 'Invitation description preview...' }}</p>
          <p class="preview-domain">{{ domain || 'undangabi.com' }}</p>
        </div>
      </div>
      <p class="message-text">Buka undangan digital kami</p>
    </div>
  </section>
</template>

<style scoped>
.whatsapp-preview {
  max-width: 420px;
  border-radius: 16px;
  background: #efeae2;
  padding: 16px;
}

.chat-bubble {
  max-width: 340px;
  border-radius: 8px;
  background: #d9fdd3;
  padding: 6px;
  box-shadow: 0 1px 0 rgba(17, 24, 39, 0.12);
}

.link-preview {
  overflow: hidden;
  border-radius: 6px;
  background: #ffffff;
}

.preview-image-wrap {
  height: 160px;
  background: #f3f4f6;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-content {
  padding: 10px 12px;
}

.preview-title {
  margin: 0;
  color: #111827;
  font-size: 14px;
  font-weight: 700;
}

.preview-description {
  display: -webkit-box;
  margin: 4px 0 0;
  overflow: hidden;
  color: #6b7280;
  font-size: 12px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.preview-domain {
  margin: 8px 0 0;
  color: #9ca3af;
  font-size: 11px;
  text-transform: uppercase;
}

.message-text {
  margin: 8px 6px 2px;
  color: #111827;
  font-size: 14px;
}
</style>
