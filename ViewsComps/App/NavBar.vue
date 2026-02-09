<template>
  <v-navigation-drawer permanent expand-on-hover rail color="wight  ">
    <v-skeleton-loader :loading="loading" max-width="400" type="table-heading">
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
    <v-spacer> </v-spacer>

    <v-list-item
      prepend-icon="mdi-post"
      :to="{ name: 'CreatePostPage' }"
      v-show="isAuth"
      title="New Post"
    ></v-list-item>
  </v-navigation-drawer>
</template>
<script setup>
import { defineProps } from "vue";
const props = defineProps({
  loading: {},
  user: {},
  isAuth: {},
});
</script>
