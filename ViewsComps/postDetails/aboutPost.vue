<template>
  <v-card
    :class="{ 'bg-indigo-darken-1': props.EditorMode }"
    :loading="props.loading"
    class="pa-2 mb-4 d-block"
  >
    <v-text-field
      :rules="textRules"
      variant="plain"
      :readonly="!props.EditorMode"
      v-model="title"
    >
    </v-text-field>
    <v-divider class="mb-3" :opacity="75"></v-divider>
    <v-textarea
      :rules="textRules"
      class="mt-3"
      :readonly="!props.EditorMode"
      v-model="body"
    >
      ></v-textarea
    >
    <v-divider class="mb-3" :opacity="75"></v-divider>
    <div>
      <v-chip
        :closable="props.EditorMode"
        close-icon="mdi-delete"
        color="green"
        @click:close="removeTag(item)"
        v-for="item in tags"
      >
        {{ item }}
      </v-chip>
    </div>
  </v-card>
</template>
<script setup>
import { defineProps, defineModel } from "vue";
const title = defineModel("title");
const body = defineModel("body");
const tags = defineModel("tags");
const props = defineProps({
  EditorMode: {},
  loading: {},
});

//правила для полей
const textRules = [required, (v) => v.length >= 5 || "Минимум 5 символов"];
function required(v) {
  return !!v || "Field is required";
}

function removeTag(item) {
  tags.value = tags.value.filter((tag) => tag !== item);
}
</script>
