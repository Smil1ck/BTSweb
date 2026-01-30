<template>
  <v-app class="d-flex">
    <v-navigation-drawer
      permanent
      color="surface-variant"
      :width="130"
      class="d-flex justify-start"
    >
      <v-list-item title="BTSweb" subtitle="testcase"></v-list-item>
      <v-divider></v-divider>
      <router-link :to="{ name: 'Home' }" class="sidebar-link">
        <v-list-item link title="Home"></v-list-item>
      </router-link>
      <v-spacer></v-spacer>
      <router-link
        v-show="!isAuth"
        :to="{ name: 'Login' }"
        class="sidebar-link"
      >
        <v-list-item link title="Login"></v-list-item>
      </router-link>
    </v-navigation-drawer>
    <router-view v-if="loading === false"></router-view>
    <div
      v-else
      class="d-flex align-center justify-center"
      style="min-height: 100vh"
    >
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </v-app>
</template>
<style scoped>
.sidebar-link {
  color: whitesmoke;
  text-decoration: none;
}
</style>
<script setup>
import { onMounted, ref, computed } from "vue";
import { useUserStore } from "./stores/user";
const userStore = useUserStore();

//Для начальной загрузки из стораджа
const loading = ref(true);
//для отображения иконки лога
const isAuth = computed(() => {
  return userStore.isLoged ? true : false;
});

//подгрузка нейма в юзерСторадж если что то лежит в сесионСторадж
onMounted(async () => {
  console.log(userStore.accessToken);
  await userStore.initialize();
  loading.value = false;
});
//States
</script>
