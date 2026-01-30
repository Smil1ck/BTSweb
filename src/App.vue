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
      <router-link :to="{ name: 'Login' }" class="sidebar-link">
        <v-list-item link title="Login"></v-list-item>
      </router-link>
    </v-navigation-drawer>
    <router-view></router-view>
  </v-app>
</template>
<style scoped>
.sidebar-link {
  color: whitesmoke;
  text-decoration: none;
}
</style>
<script setup>
import { onMounted } from "vue";
import { useUserStore } from "./stores/user";
</script>
