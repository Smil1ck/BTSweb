<template>
  <v-card
    class="bg-grey-lighten-4 ma-9 d-flex align-center justify-center"
    :height="$vuetify.display.mobile ? 'calc(100vh - 56px)' : '92vh'"
    rounded
  >
    <v-row justify="center" align="stretch">
      <v-col
        class="d-flex align-center justify-center"
        cols="12"
        sm="10"
        md="8"
        lg="6"
        xl="4"
      >
        <v-card variant="outlined">
          <div class="d-flex flex-column pa-2">
            <div
              class="text-h5 text-sm-h4 text-md-h3 text-lg-h2"
              v-if="!isAuth"
            >
              Welcome: {{ user }}<br />Login in your account to continue
            </div>
            <div class="text-h5 text-sm-h4 text-md-h3 text-lg-h2" v-else>
              Welcome: {{ user }}<br />Have a nice day
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
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
