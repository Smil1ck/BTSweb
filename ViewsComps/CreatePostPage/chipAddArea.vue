<template>
  <v-card class="pa-2 d-block mb-3">
    <h1 class="text-h5">Добавление хештегов</h1>
    <v-textarea
      class="mt-3"
      placeholder="#hashtag"
      v-model="tagsfield"
    ></v-textarea>
    <!--submit-->
    <div class="d-flex justify-end ga-2">
      <v-btn
        class="text-none pa-1 text-subtitle-1 v-col-2"
        color="green"
        size="small"
        variant="flat"
        rounded="xl"
        @click="addTags"
      >
        Добавить
      </v-btn>
      <v-btn
        rounded="xl"
        class="text-none pa-1 text-subtitle-1 v-col-2"
        color="red"
        size="small"
        variant="flat"
        @click="cancelTags"
      >
        Отмена
      </v-btn>
    </div>
  </v-card>
</template>
<script setup>
import { defineModel } from "vue";
const tagsfield = defineModel("tagsfield");
const tagList = defineModel("tagList");
// Обработка поля для тегов-----------------------------------------------------------
function addTags() {
  if (!tagList.value || tagList.value.length === 0) {
    let bufList = tagsfield.value.split(/#|\s+/).filter((item) => item !== "");
    tagList.value = [...new Set([...tagList.value, ...bufList])];
    tagsfield.value = "";
  } else {
    let bufList = tagsfield.value.split(/#|\s+/).filter((item) => item !== "");
    tagList.value = [...new Set([...tagList.value, ...bufList])];
    tagsfield.value = "";
  }
}
function cancelTags() {
  tagsfield.value = "";
}
</script>
