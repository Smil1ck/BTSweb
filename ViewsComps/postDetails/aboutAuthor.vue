<template>
  <v-card :loading="props.loading" class="pa-2 mb-4 d-block">
    <span class="text-h5 text-sm-h4 text-md-h3 text-lg-h2">Об Авторе :</span>
    <v-divider class="mb-3" :opacity="75"></v-divider>
    <div class="mt-1 mb-1 text-h5 text-sm-h4 text-md-h3 text-lg-h2">
      <span>ФИО : {{ props.firstName }} {{ props.lastName }}</span>
      <br />
      <span>Должность : {{ props.job }}</span>
      <br />
      <span>Отдел : {{ props.department }}</span>
    </div>
  </v-card>
</template>
<script setup>
import { defineProps } from "vue";
const props = defineProps({
  firstName: {},
  lastName: {},
  job: {},
  department: {},
  loading: {},
});
</script>
