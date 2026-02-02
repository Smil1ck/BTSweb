<template>
  <v-card
    class="bg-grey-lighten-4 ma-10 d-flex align-center justify-center"
    :height="$vuetify.display.mobile ? 'calc(100vh - 56px)' : '100vh'"
    rounded
  >
    <div class="d-flex ml-4" style="font-size: 40px">
      <h1 v-if="!isAuth">
        Welcome: {{ user }}<br />Login in your account to continue
      </h1>
      <h1 v-else>Welcome: {{ user }}<br />Have a nice day</h1>
    </div>
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const isAuth = ref(userStore.isLoged);

//Обновление имени пользователя
const user = computed(() => {
  return userStore.getUserName;
});
</script>
