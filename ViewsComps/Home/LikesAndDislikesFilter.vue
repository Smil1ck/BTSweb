<template>
  <!--Likes-->
  <v-menu open-on-hover :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn
        :disabled="props.disabled"
        color="primary"
        rounded="xl"
        v-bind="props"
      >
        Likes Filter
      </v-btn>
    </template>
    <v-sheet class="d-inline-flex pa-3 align-center ga-2 justify-center">
      <v-text-field
        :width="200"
        label="от"
        v-model="likesRange[0]"
        variant="outlined"
        placeholder="от"
        rounded="xl"
        type="number"
        :min="0"
        :max="likesRange[1]"
      ></v-text-field>
      <v-text-field
        label="до"
        v-model="likesRange[1]"
        variant="outlined"
        placeholder="до"
        rounded="xl"
        type="number"
        :min="likesRange[0]"
      ></v-text-field>
    </v-sheet>
  </v-menu>
  <!--DisLikes-->
  <v-menu open-on-hover :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn
        :disabled="props.disabled"
        color="primary"
        rounded="xl"
        v-bind="props"
      >
        DisLikes Filter
      </v-btn>
    </template>
    <v-sheet class="d-inline-flex pa-3 align-center ga-2 justify-center">
      <v-text-field
        label="от"
        :width="200"
        v-model="dislikesRange[0]"
        variant="outlined"
        placeholder="от"
        rounded="xl"
        type="number"
        :min="0"
        :max="dislikesRange[1]"
      ></v-text-field>
      <v-text-field
        label="до"
        v-model="dislikesRange[1]"
        variant="outlined"
        placeholder="до"
        rounded="xl"
        type="number"
        :min="dislikesRange[0]"
      ></v-text-field>
    </v-sheet>
  </v-menu>
  <!--Button Clear Filters-->
  <v-btn
    :disabled="props.disabled"
    rounded="xl"
    color="red"
    @click="clearFilters"
  >
    Clear Filters
  </v-btn>
</template>

<script setup>
import { defineModel, defineProps } from "vue";
const likesRange = defineModel("likesRange");
const dislikesRange = defineModel("dislikesRange");
const props = defineProps({ disabled: {} });
function clearFilters() {
  likesRange.value = [0, 0];
  dislikesRange.value = [0, 0];
}
</script>
