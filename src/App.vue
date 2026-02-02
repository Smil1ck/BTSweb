<template>
  <v-app class="d-flex">
    <v-navigation-drawer permanent expand-on-hover rail color="wight  ">
      <v-skeleton-loader
        :loading="loading"
        max-width="400"
        type="table-heading"
      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          :title="user"
          subtitle="testcase"
        ></v-list-item>
      </v-skeleton-loader>
      <v-divider></v-divider>

      <v-list-item
        prepend-icon="mdi-home"
        :to="{ name: 'Home' }"
        title="Home"
      ></v-list-item>
      <v-spacer></v-spacer>

      <v-list-item
        prepend-icon="mdi-login"
        :to="{ name: 'Login' }"
        v-show="!isAuth"
        title="Login"
      ></v-list-item>
    </v-navigation-drawer>

    <v-main>
      <v-card>
        <router-view v-if="loading === false"></router-view>
        <div
          v-else
          class="d-flex align-center justify-center"
          style="min-height: 100vh"
        >
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </v-card>
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useUserStore } from "./stores/user";
const userStore = useUserStore();

const user = computed(() => userStore.getUserName);
//Для начальной загрузки из стораджа
const loading = ref(true);
//для отображения иконки лога
const isAuth = computed(() => {
  return userStore.isLoged ? true : false;
});

//подгрузка нейма в юзерСторадж и проверка на авторизацию если что то лежит в сесионСторадж
onMounted(async () => {
  console.log(userStore.accessToken);
  await userStore.initialize();
  loading.value = false;
});
//States
</script>
