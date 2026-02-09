<template>
  <v-snackbar
    v-model="snackbarSuccess"
    :timeout="3000"
    class="elevation-24"
    location="top"
    color="green"
  >
    Успешно сохранено.
  </v-snackbar>
  <v-snackbar
    v-model="snackbarFailue"
    :timeout="3000"
    class="elevation-24"
    location="top"
    color="red"
  >
    Ошибка сохранения.
  </v-snackbar>
</template>

<script setup>
import { defineModel } from "vue";
const snackbarSuccess = defineModel("snackbarSuccess");
const snackbarFailue = defineModel("snackbarFailue");
</script>
