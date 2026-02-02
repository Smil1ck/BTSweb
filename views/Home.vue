<template>
  <v-card
    class="bg-grey-lighten-2 ma-7 pa-3"
    :height="$vuetify.display.mobile ? 'calc(100vh - 56px)' : '100vh'"
    rounded
  >
    <v-row justify="start" align="center">
      <v-col cols="12" sm="8" md="6" lg="2">
        <v-card :loading="loading" class="pa-6">
          <!-- Информация о пользователе -->
          <div class="mb-8">
            <!-- User -->
            <div class="d-flex align-center mb-4">
              <v-list-item
                prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
                :title="user"
              ></v-list-item>
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
  </v-card>
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
