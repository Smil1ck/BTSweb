<template>
  <!--Header-->
  <v-card class="pa-2 mb-3 v-col-12">
    <h1 class="text-h2">Создание нового поста</h1>
  </v-card>
  <!--info about post-->
  <v-card class="pa-2 mb-4 d-block">
    <v-text-field
      variant="outlined"
      placeholder="title"
      v-model="title"
      :rules="textRulesTitle"
    >
    </v-text-field>
    <v-divider class="mb-3" :opacity="75"></v-divider>
    <v-textarea
      class="mt-3"
      placeholder="body"
      v-model="body"
      :rules="textRulesBody"
    ></v-textarea>
    <v-divider class="mb-3" :opacity="75"></v-divider>
    <div>
      <v-chip
        close-icon="mdi-delete"
        color="green"
        :closable="true"
        @click:close="removeTag(item)"
        v-for="item in tagList"
      >
        {{ item }}
      </v-chip>
    </div>
  </v-card>
</template>
<script setup>
import { defineModel } from "vue";
const title = defineModel("title");
const body = defineModel("body");
const tagList = defineModel("tagList");

function removeTag(item) {
  tagList.value = tagList.value.filter((tag) => tag !== item);
}
//правила для полей------------------------------------
const textRulesTitle = [
  required,
  (v) =>
    (v.length >= 5 && v.length <= 80) ||
    "Название должно быть в диапазоне 5-80 символов",
];
const textRulesBody = [required];
function required(v) {
  return !!v || "Field is required";
}
</script>
