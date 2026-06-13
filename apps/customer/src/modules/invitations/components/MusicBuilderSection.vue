<script setup lang="ts">
import InputText from 'primevue/inputtext';
import { computed } from 'vue';

interface MusicBuilderForm {
  music_url: string;
}

const form = defineModel<MusicBuilderForm>({ required: true });

const hasMusic = computed(() => !!form.value.music_url);
</script>

<template>
  <section class="builder-form" aria-labelledby="music-builder-title">
    <div>
      <p class="eyebrow">Music</p>
      <h2 id="music-builder-title">Background Music</h2>
    </div>

    <div class="form-group">
      <label for="music_url">Music URL</label>
      <InputText id="music_url" v-model="form.music_url" placeholder="https://cdn.example.com/music.mp3" fluid />
      <p class="helper-text">Supported: MP3, AAC, OGG audio files</p>
    </div>

    <div v-if="hasMusic" class="audio-preview">
      <audio :src="form.music_url" controls class="audio-player">
        Your browser does not support the audio element.
      </audio>
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

.audio-preview {
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  padding: 12px 16px;
  background: #f9fafb;
}

.audio-player {
  width: 100%;
}
</style>
