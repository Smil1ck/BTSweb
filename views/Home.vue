<template>
  <v-container class="fill-height">
    <v-row justify="start" align="center">
      <v-col cols="12" sm="8" md="6" lg="3">
        <v-card :loading="loading" class="pa-6">
          <!-- Информация о пользователе -->
          <div class="mb-8">
            <!-- User -->
            <div class="d-flex align-center mb-4">
              <span class="text-subtitle-1 font-weight-bold">User:</span>
              <span class="text-body-1">{{ user }}</span>
            </div>
          </div>

          <!-- Кнопка выхода -->
          <v-btn
            @click="logout"
            :loading="loading"
            color="error"
            variant="tonal"
            prepend-icon="mdi-logout"
            block
          >
            Logout
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();

//variables
const loading = computed(() => {
  return userStore.isLoading;
});

//Обновление имени пользователя
const user = computed(() => {
  return userStore.getUserName;
});
//funcs
const logout = () => {
  userStore.logout();
};
</script>
