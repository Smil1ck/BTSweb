<template>
  <v-card :loading="loading" class="pa-2">
    <!--хедер для карточки-->
    <div class="d-flex">
      <span>{{ props.title }}</span>
      <v-spacer></v-spacer>
      <span>userID: {{ props.userId }}</span>
    </div>
    <v-divider :thickness="3"></v-divider>
    <!--Тело карточки-->
    <div class="mt-2 mb-2">
      <span>{{ fixedString(props.body) }}</span>
    </div>
    <v-divider :thickness="3"></v-divider>
    <!--Футер карточки-->
    <div class="d-flex ga-10 mt-1">
      <span>
        <v-icon
          color="blue-lighten-2"
          icon="mdi-thumb-up"
          variant="text"
        ></v-icon>
        : {{ props.likes }}
      </span>
      <span>
        <v-icon color="red" icon="mdi-thumb-down" variant="text"></v-icon>
        : {{ props.dislikes }}
      </span>
      <v-spacer></v-spacer>
      <span>
        <v-icon color="yellow" icon="mdi-star" variant="text"></v-icon>
        : {{ rating }}
      </span>
    </div>
  </v-card>
</template>

<script setup>
import { defineProps, computed } from "vue";
const props = defineProps({
  title: {},
  userId: {},
  body: {},
  likes: {},
  dislikes: {},
  loading: {},
});

const rating = computed(() => {
  return props.likes - props.dislikes;
});

const fixedString = (str) => {
  return str?.length > 100 ? str.slice(0, 100) + "..." : str;
};
</script>
