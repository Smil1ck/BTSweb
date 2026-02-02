<template>
  <v-card
    class="bg-grey-lighten-2 ma-10 d-flex align-center justify-center"
    :height="$vuetify.display.mobile ? 'calc(100vh - 56px)' : '100vh'"
    rounded
  >
    <v-card class="pa-2" style="scale: 1.5" width="400" max-width="700">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="username"
          :readonly="loading"
          :rules="userRules"
          class="mb-2"
          label="Username"
          placeholder="Enter your username"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="passRules"
          label="Password"
          placeholder="Enter your password"
          :error-messages="fieldErrors"
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
  </v-card>
</template>
<script setup>
import { ref, watch } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
//variables
const form = ref(false);
const username = ref(null);
const password = ref(null);
const loading = ref(null);
const fieldErrors = ref(null);

//Для изменения собственных ошибок
watch(password, () => {
  fieldErrors.value = null;
});
//Form Rules
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
function required(v) {
  return !!v || "Field is required";
}

//Button logic (Кнопка авторизации)
async function onSubmit() {
  if (!form.value) return;
  loading.value = true;
  try {
    await userStore.login({ username, password });
    loading.value = false;
  } catch (err) {
    setTimeout(() => {
      fieldErrors.value = "Неверное имя пользователя или пароль.";
      loading.value = false;
    }, 1500);
  }
}
</script>
