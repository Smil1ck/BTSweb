<template>
  <v-sheet class="bg-deep-black pa-12" rounded style="margin-top: 200px">
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="username"
          :readonly="loading"
          :rules="userRules"
          class="mb-2"
          label="username"
          placeholder="Username"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="passRules"
          label="Password"
          placeholder="Enter your password"
          clearable
        ></v-text-field>

        <br />

        <v-btn
          :disabled="!form"
          :loading="loading"
          color="black"
          size="large"
          type="submit"
          variant="elevated"
          block
        >
          Sign In
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>
<script setup>
import { ref } from "vue";

const form = ref(false);
const username = ref(null);
const password = ref(null);
const loading = ref(false);

const passRules = [
  required,
  (v) => (v && v.length >= 8) || "Минимум 8 символов",
];
const userRules = [
  required,
  (v) =>
    (v && v.length >= 3 && v.length <= 20) ||
    "Имя должно быть в диапазоне 3-20 симоволов",
];

function onSubmit() {
  if (!form.value) return;
  loading.value = true;
  setTimeout(() => (loading.value = false), 2000);
}
function required(v) {
  return !!v || "Field is required";
}
</script>
