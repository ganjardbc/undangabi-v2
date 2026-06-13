<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import { computed } from 'vue';
import WhatsappPreview from './WhatsappPreview.vue';

interface SeoBuilderForm {
  seo_title: string;
  seo_description: string;
  og_image_url: string;
}

const form = defineModel<SeoBuilderForm>({ required: true });

const hasOgImage = computed(() => !!form.value.og_image_url);
</script>

<template>
  <section class="builder-form" aria-labelledby="seo-builder-title">
    <div>
      <p class="eyebrow">SEO</p>
      <h2 id="seo-builder-title">Search Engine & Social Media Preview</h2>
    </div>

    <div class="form-group">
      <label for="seo_title">SEO Title</label>
      <InputText id="seo_title" v-model="form.seo_title" placeholder="Undangan Pernikahan Ganjar & Fitri" fluid />
      <p class="helper-text">This title appears on search engines and browser tabs.</p>
    </div>

    <div class="form-group">
      <label for="seo_description">SEO Description</label>
      <Textarea id="seo_description" v-model="form.seo_description" rows="3" placeholder="Mohon doa restu pada pernikahan kami..." fluid />
      <p class="helper-text">Brief summary shown in search results.</p>
    </div>

    <div class="form-group">
      <label for="og_image_url">OpenGraph Image URL (Social Share)</label>
      <InputText id="og_image_url" v-model="form.og_image_url" placeholder="https://cdn.example.com/og-image.jpg" fluid />
      <p class="helper-text">Image shown when the link is shared on social media or chat apps.</p>
    </div>

    <div v-if="hasOgImage" class="preview-card">
      <p class="preview-label">WhatsApp Preview</p>
      <WhatsappPreview
        :title="form.seo_title"
        :description="form.seo_description"
        :image-url="form.og_image_url"
      />
    </div>
  </section>
</template>

<style scoped>
.builder-form {
  display: grid;
  max-width: 720px;
  gap: 18px;
}

.helper-text {
  margin: 4px 0 0;
  font-size: 12px;
  color: #6b7280;
}

.preview-card {
  margin-top: 12px;
}

.preview-label {
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

</style>
