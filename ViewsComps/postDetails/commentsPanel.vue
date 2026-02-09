<template>
  <v-expansion-panel>
    <v-expansion-panel-title>Комментарии</v-expansion-panel-title>
    <v-expansion-panel-text class="pa-3 d-block">
      <!--Commms cards-->
      <v-card
        v-for="item in props.comments"
        :loading="props.loading"
        class="pa-3 mt-3 bg-black"
      >
        <span>{{ item.user.username }}</span>
        <v-divider class="mb-3" :opacity="75"></v-divider>
        <span>{{ item.body }}</span>
        <v-divider class="mb-3 mt-3" :opacity="75"></v-divider>
        <span>
          <v-icon
            color="blue-lighten-2"
            icon="mdi-thumb-up"
            variant="text"
          ></v-icon>
          :{{ item.likes }}
        </span>
      </v-card>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
<script setup>
import { defineProps } from "vue";
const props = defineProps({
  comments: {},
  loading: {},
});
</script>
