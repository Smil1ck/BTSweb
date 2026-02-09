<template>
  <v-app class="d-flex">
    <nav-bar
      v-bind="{
        loading: loading,
        user: user,
        isAuth: isAuth,
      }"
    ></nav-bar>
    <v-main>
      <v-card>
        <router-view
          v-if="loading === false"
          :key="$route.fullPath"
        ></router-view>
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
import NavBar from "../ViewsComps/App/NavBar.vue";
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
