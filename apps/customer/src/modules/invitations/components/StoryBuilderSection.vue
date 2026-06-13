<script setup lang="ts">
import Textarea from 'primevue/textarea';
import { computed } from 'vue';

interface StoryBuilderForm {
  story: string;
}

const form = defineModel<StoryBuilderForm>({ required: true });

const charCount = computed(() => form.value.story?.length || 0);
</script>

<template>
  <section class="builder-form" aria-labelledby="story-builder-title">
    <div>
      <p class="eyebrow">Story</p>
      <h2 id="story-builder-title">Couple Story or Event Narrative</h2>
    </div>

    <div class="form-group">
      <label for="story">Story</label>
      <Textarea id="story" v-model="form.story" rows="10" fluid />
      <p class="helper-text">{{ charCount }} characters</p>
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
</style>
