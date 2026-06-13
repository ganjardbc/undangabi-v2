<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import { computed } from 'vue';

interface CoverBuilderForm {
  cover_image_url: string;
}

const form = defineModel<CoverBuilderForm>({ required: true });

const hasCover = computed(() => !!form.value.cover_image_url);

const coverStyles = [
  { label: 'Centered', value: 'centered' },
  { label: 'Full Width', value: 'full' },
  { label: 'Blurred', value: 'blurred' },
];

const coverStyle = defineModel<string>('cover_style', { default: 'centered' });
</script>

<template>
  <section class="builder-form" aria-labelledby="cover-builder-title">
    <div>
      <p class="eyebrow">Cover</p>
      <h2 id="cover-builder-title">Cover Image & Style</h2>
    </div>

    <div class="form-group">
      <label for="cover_image_url">Cover Image URL</label>
      <InputText id="cover_image_url" v-model="form.cover_image_url" placeholder="https://cdn.example.com/cover.jpg" fluid />
    </div>

    <div v-if="hasCover" class="cover-preview">
      <img :src="form.cover_image_url" alt="Cover preview" class="cover-image" />
    </div>

    <div class="form-group">
      <label for="cover_style">Cover Style</label>
      <Select id="cover_style" v-model="coverStyle" :options="coverStyles" optionLabel="label" optionValue="value" fluid />
    </div>
  </section>
</template>

<style scoped>
.builder-form {
  display: grid;
  max-width: 720px;
  gap: 18px;
}

.cover-preview {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.cover-image {
  display: block;
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  background: #f3f4f6;
}
</style>
