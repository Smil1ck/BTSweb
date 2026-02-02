<template>
  <v-card
    class="bg-grey-lighten-2 ma-7 pa-3"
    :height="$vuetify.display.mobile ? 'calc(100vh - 56px)' : '100vh'"
    rounded
  >
    <!--карточка пользователя-->
    <v-row justify="start" align="stretch">
      <v-col cols="12" sm="4" md="3" lg="3">
        <v-card
          :loading="loading"
          class="pa-6 fill-height"
          style="max-height: 200px; overflow-y: auto"
        >
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
      <!--Параметры отображения постов-->
      <v-col cols="12" sm="8" md="9" lg="9">
        <v-card :loading="loading" style="max-height: 200px">
          <div class="pt-3">
            <!-- Params -->
            <div class="d-block align-center ma-2 fill-height">
              <v-text-field
                label=""
                prepend-icon="mdi-magnify"
                variant="outlined"
              ></v-text-field>
              <v-divider :thickness="3"></v-divider>
              <v-select
                class="v-col-6"
                label="Кол-во постов на странице"
                :items="['10', '30', '50']"
              ></v-select>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="mt-3" :thickness="3"></v-divider>
    <!--хедер постов -->
    <!--карточки  постов -->
    <!--выбор страницы -->
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
