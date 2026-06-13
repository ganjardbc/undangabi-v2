<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';

interface GeneralBuilderForm {
  title: string;
  slug: string;
  event_type: string;
  youtube_url: string;
  story: string;
}

const form = defineModel<GeneralBuilderForm>({ required: true });

const eventTypes = [
  { label: 'Wedding', value: 'wedding' },
  { label: 'Khitanan', value: 'khitanan' },
  { label: 'Birthday', value: 'birthday' },
  { label: 'Graduation', value: 'graduation' },
  { label: 'Seminar', value: 'seminar' },
  { label: 'Gathering', value: 'gathering' },
  { label: 'Custom', value: 'custom' },
];
</script>

<template>
  <section class="builder-form" aria-labelledby="general-builder-title">
    <div>
      <p class="eyebrow">General</p>
      <h2 id="general-builder-title">Basic Invitation Information</h2>
    </div>

    <div class="form-group">
      <label for="title">Title</label>
      <InputText id="title" v-model="form.title" fluid />
    </div>

    <div class="form-group">
      <label for="slug">Slug</label>
      <InputText id="slug" v-model="form.slug" fluid />
    </div>

    <div class="form-group">
      <label for="event_type">Event Type</label>
      <Select id="event_type" v-model="form.event_type" :options="eventTypes" optionLabel="label" optionValue="value" fluid />
    </div>

    <div class="form-group">
      <label for="youtube_url">YouTube URL</label>
      <InputText id="youtube_url" v-model="form.youtube_url" placeholder="https://youtube.com/watch?v=example" fluid />
    </div>
  </section>
</template>

<style scoped>
.builder-form {
  display: grid;
  max-width: 720px;
  gap: 18px;
}
</style>
