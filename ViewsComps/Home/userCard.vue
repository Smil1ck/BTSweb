<template>
  <v-card
    :loading="props.loading"
    class="pa-6 fill-height"
    style="max-height: 200px; overflow-y: auto"
  >
    <!-- Информация о пользователе -->
    <div class="mb-8">
      <!-- User -->
      <div class="d-flex align-center mb-4">
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          :title="props.username"
        ></v-list-item>
      </div>
    </div>

    <!-- Кнопка выхода -->
    <v-btn
      @click="logout"
      :loading="props.loading"
      color="error"
      variant="tonal"
      prepend-icon="mdi-logout"
      block
    >
      Logout
    </v-btn>
  </v-card>
</template>
<script setup>
import { defineProps } from "vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const props = defineProps({
  username: {},
  loading: {},
});

const logout = () => {
  userStore.logout();
};
</script>
